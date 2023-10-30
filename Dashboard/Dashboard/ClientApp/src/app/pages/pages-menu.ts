import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/home',
  },
  {
    title: 'FRIENDZY',
    group: true,
  },
  {
    title: 'Groups',
    icon: 'people-outline',
    link: '/pages/groups',
  },
  {
    title: 'Leaderboard',
    icon: 'award-outline',
    link: '/pages/leaderboard',
  },
  {
    title: 'Activities',
    icon: 'flash-outline',
    link: '/pages/activities',
  },
  {
    title: 'Profile',
    icon: 'person-outline',
    link: '/pages/profile',
  },
];
