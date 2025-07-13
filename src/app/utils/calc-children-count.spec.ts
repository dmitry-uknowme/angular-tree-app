import { calcChildrenCountMap } from './calc-children-count';
import { ITreeNode } from '../components/tree-node/tree-node.component';

describe('calcChildrenCountMap', () => {
  it('should count all descendants', () => {
    const tree: ITreeNode[] = [
      {
        id: 1,
        title: '1',
        is_deleted: false,
        children: [
          {
            id: 2,
            title: '2',
            is_deleted: false,
            children: [
              {
                id: 3,
                title: '3',
                is_deleted: false,
                children: [],
              },
            ],
          },
        ],
      },
    ];

    const map = calcChildrenCountMap(tree);

    expect(map.get(1)).toBe(2); // 2 + 3
    expect(map.get(2)).toBe(1); // 3
    expect(map.get(3)).toBe(0);
  });

  it('should count empty tree as empty map', () => {
    const map = calcChildrenCountMap([]);
    expect(map.size).toBe(0);
  });
});
