import { Component, signal, WritableSignal } from '@angular/core';
import DEFAULT_TREE_NODES from './components/tree/tree-data';
import { TreeComponent } from './components/tree/tree.component';
import { ITreeNode } from './components/tree-node/tree-node.component';

@Component({
  selector: 'app-root',
  imports: [TreeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  treeNodes = DEFAULT_TREE_NODES;
  // treeNodes = signal<ITreeNode[]>(DEFAULT_TREE_NODES);
}
