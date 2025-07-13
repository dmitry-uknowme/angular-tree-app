import { CommonModule } from '@angular/common';
import { TreeComponent } from '../tree/tree.component';
import { Component, Input } from '@angular/core';
import { ITreeNode } from '../tree-node/tree-node.component';

@Component({
  standalone: true,
  selector: 'app-first-tree',
  templateUrl: './first-tree.html',
  imports: [CommonModule, TreeComponent],
})
export class FirstTreeComponent {
  @Input() treeNodes!: ITreeNode[];

  onNodeClick(node: ITreeNode) {
    console.log(`нажали на узел ID ${node.id}`);
  }
}
