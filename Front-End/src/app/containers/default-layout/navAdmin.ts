import { INavData } from '@coreui/angular';

export const navAdmin: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Profile',
  },
  {
    name: 'View Profile',
    url: '/dashboard/view_admins/profile',
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'Services',
    title: true,
  },
  {
    name: 'Doctors',
    url: '/dashboard/view_doctors',
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'Patients',
    url: '/dashboard/view_patients',
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'Admins',
    url: '/dashboard/view_admins',
    iconComponent: { name: 'cil-drop' },
  },
];
