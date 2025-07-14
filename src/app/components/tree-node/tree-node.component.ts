import {
  Component,
  computed,
  ContentChild,
  EventEmitter,
  Input,
  input,
  Output,
  signal,
  TemplateRef,
} from '@angular/core';
import { TreeComponent } from '../tree/tree.component';
import {
  CommonModule,
  NgOptimizedImage,
  provideImgixLoader,
} from '@angular/common';

export interface ITreeNode {
  id: number;
  title: string;
  is_deleted: boolean;
  deleted_at?: null;
  children: ITreeNode[];
}

@Component({
  standalone: true,
  selector: 'app-tree-node',
  templateUrl: './tree-node.html',
  styleUrls: ['./tree-node.scss'],
  imports: [CommonModule],
  // providers: [provideImgixLoader('/assets/images')],
})
export class TreeNodeComponent {
  @Input() node!: ITreeNode;
  @Input() expanded = true;
  @Input() childrenCount: number | null = null;

  @Input() canExpand = false;
  @Input() canExpandAll = false;

  @Input() nodeTemplate?: TemplateRef<any>;
  @Output() nodeClick = new EventEmitter<ITreeNode>();

  onClick() {
    this.nodeClick.emit(this.node);
  }
}
