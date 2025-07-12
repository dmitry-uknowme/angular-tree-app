import { Component, signal } from '@angular/core';
import DEFAULT_TREE_NODES from './components/tree/tree-data';
import { Tree } from './components/tree/tree.component';

@Component({
  selector: 'app-root',
  imports: [Tree],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  treeNodes = DEFAULT_TREE_NODES;
}
