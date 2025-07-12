import { Component, Input, input } from '@angular/core';

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
})
export class TreeNode {
  // node = input<TreeNode>();
  @Input() node!: ITreeNode;
}
