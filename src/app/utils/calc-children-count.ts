import { ITreeNode } from '../components/tree-node/tree-node.component';

export function calcChildrenCountMap(nodes: ITreeNode[]): Map<number, number> {
  const map = new Map<number, number>();
  const stack1: ITreeNode[] = [...nodes];
  const stack2: ITreeNode[] = [];

  while (stack1.length) {
    const node = stack1.pop()!;
    stack2.push(node);
    for (const child of node.children) {
      stack1.push(child);
    }
  }

  for (const node of stack2.reverse()) {
    let total = 0;
    for (const child of node.children) {
      total += 1 + (map.get(child.id) ?? 0);
    }
    map.set(node.id, total);
  }

  return map;
}
