export interface GameInfo {
  id: string;
  titleKey: string;
  descKey: string;
  url: string;
  tags: string[];
}

export const gameList: GameInfo[] = [
  {
    id: 'dragUp',
    titleKey: 'dragUp_title',
    descKey: 'dragUp_desc',
    url: '/games/dragUp.html',
    tags: ['puzzle', 'drag'],
  },
  {
    id: 'alignUp',
    titleKey: 'alignUp_title',
    descKey: 'alignUp_desc',
    url: '/games/alignUp/',
    tags: ['strategy', 'board'],
  },
  {
    id: 'catUp',
    titleKey: 'catUp_title',
    descKey: 'catUp_desc',
    url: '/games/catUp.html',
    tags: ['casual', 'cute'],
  },
  {
    id: 'findUp',
    titleKey: 'findUp_title',
    descKey: 'findUp_desc',
    url: '/games/findUp.html',
    tags: ['memory', 'search'],
  },
  {
    id: 'lineUp',
    titleKey: 'lineUp_title',
    descKey: 'lineUp_desc',
    url: '/games/lineUp.html',
    tags: ['puzzle', 'lines'],
  },
];
