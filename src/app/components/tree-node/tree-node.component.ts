import {
  Component,
  computed,
  EventEmitter,
  Input,
  input,
  Output,
  signal,
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
  @Output() toggle = new EventEmitter<MouseEvent>();

  @Input() canExpand = false;
  @Input() canExpandAll = false;

  onToggle(event: MouseEvent) {
    this.toggle.emit(event);
  }
}
