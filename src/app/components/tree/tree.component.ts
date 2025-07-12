import { Component, Input, input } from '@angular/core';
import { ITreeNode, TreeNode } from '../tree-node/tree-node.component';

@Component({
  standalone: true,
  selector: 'app-tree',
  templateUrl: './tree.html',
  imports: [TreeNode],
})
export class Tree {
  // nodes = input<TreeNode[]>();
  @Input() nodes: ITreeNode[] = [];
}
