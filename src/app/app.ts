import { Component, signal, WritableSignal } from '@angular/core';
import DEFAULT_TREE_NODES from './components/tree/tree-data';
import { FirstTreeComponent } from './components/first-tree/first-tree.component';
import { SecondTreeComponent } from './components/second-tree/second-tree.component';

@Component({
  selector: 'app-root',
  imports: [FirstTreeComponent, SecondTreeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  treeNodes = DEFAULT_TREE_NODES;
  // treeNodes = signal<ITreeNode[]>(DEFAULT_TREE_NODES);
}
