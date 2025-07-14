import { CommonModule } from '@angular/common';
import { TreeComponent } from '../tree/tree.component';
import { Component, Input } from '@angular/core';
import { ITreeNode } from '../tree-node/tree-node.component';

@Component({
  standalone: true,
  selector: 'app-second-tree',
  templateUrl: './second-tree.html',
  imports: [CommonModule, TreeComponent],
})
export class SecondTreeComponent {
  @Input() nodes!: ITreeNode[];

  onNodeClick(node: ITreeNode) {
    console.log(`нажали на узел ID ${node.id}`);
  }
}
