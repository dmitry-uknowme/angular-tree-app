import {
  Component,
  computed,
  Input,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { ITreeNode, TreeNodeComponent } from '../tree-node/tree-node.component';
import { CommonModule } from '@angular/common';

interface NodeExpandedInfo {
  childrenCount: number;
  isExpanded: boolean;
}

@Component({
  standalone: true,
  selector: 'app-tree',
  templateUrl: './tree.html',
  imports: [CommonModule, TreeNodeComponent],
})
export class TreeComponent {
  private _nodes = signal<ITreeNode[]>([]);
  private _localExpandedMap = new Map<number, WritableSignal<boolean>>();
  private _injectedExpandedMap? = new Map<number, WritableSignal<boolean>>();

  @Input() canExpand: boolean = false;
  @Input() canExpandAll: boolean = true;
  @Input() set expandedMapState(
    value: Map<number, WritableSignal<boolean>> | undefined
  ) {
    this._injectedExpandedMap = value;
  }

  @Input() set nodes(value: ITreeNode[]) {
    this._nodes.set(value ?? []);
  }

  get nodes(): ITreeNode[] {
    return this._nodes();
  }

  getExpandedMap(): Map<number, WritableSignal<boolean>> {
    return this._injectedExpandedMap ?? this._localExpandedMap;
  }

  private childrenCountMap = computed(() => {
    const nodes = this._nodes();
    const map = new Map<number, number>();

    const stack1: ITreeNode[] = [...nodes];
    const stack2: ITreeNode[] = [];

    // Сначала проходим все узлы в прямом порядке
    while (stack1.length) {
      const node = stack1.pop()!;
      stack2.push(node);
      for (const child of node.children) {
        stack1.push(child);
      }
    }

    // Затем считаем снизу вверх (обратный обход)
    for (const node of stack2.reverse()) {
      let total = 0;
      for (const child of node.children) {
        total += 1; // прямой потомок
        total += map.get(child.id) ?? 0; // и все его потомки
      }
      map.set(node.id, total);
    }

    return map;
  });

  isExpanded(node: ITreeNode): boolean {
    const expandedMap = this.getExpandedMap();
    if (!expandedMap.has(node.id)) {
      expandedMap.set(node.id, signal(false));
    }
    return expandedMap.get(node.id)!();
  }

  childrenCount(node: ITreeNode): number {
    return this.childrenCountMap().get(node.id) ?? 0;
  }

  toggleExpand(node: ITreeNode) {
    const expandedMap = this.getExpandedMap();
    const signal = expandedMap.get(node.id)!;
    signal.update((v) => !v);
  }

  expandAll(node: ITreeNode) {
    const expandedMap = this.getExpandedMap();
    const stack: ITreeNode[] = [node];

    while (stack.length) {
      const current = stack.pop()!;

      if (!expandedMap.has(current.id)) {
        expandedMap.set(current.id, signal(true));
      } else {
        expandedMap.get(current.id)!.set(true);
      }

      for (const child of current.children) {
        stack.push(child);
      }
    }
  }

  // collapseAll(node: ITreeNode) {
  //   const expandedMap = this.getExpandedMap();
  //   const stack: ITreeNode[] = [node];

  //   while (stack.length) {
  //     const current = stack.pop()!;

  //     if (!expandedMap.has(current.id)) {
  //       expandedMap.set(current.id, signal(true));
  //     } else {
  //       expandedMap.get(current.id)!.set(true);
  //     }

  //     for (const child of current.children) {
  //       stack.push(child);
  //     }
  //   }
  // }

  // expandAll(node: ITreeNode) {
  //   const expandedMap = this.getExpandedMap();
  //   if (!expandedMap.has(node.id)) {
  //     expandedMap.set(node.id, signal(true));
  //   } else {
  //     expandedMap.get(node.id)!.set(true);
  //   }
  //   for (const child of node.children) {
  //     this.expandAll(child);
  //   }
  // }
}
