import { INavData } from '@coreui/angular';

export const navDoc: INavData[] = [
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
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'Services',
    title: true,
  },
  {
    name: 'Patients',
    url: '/dashboard/patients',
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'Appointments',
    url: '/dashboard/Appointments',
    iconComponent: { name: 'cil-drop' },
  },
];
