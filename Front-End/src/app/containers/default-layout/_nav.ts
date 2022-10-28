import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
  },
  {
    title: true,
    name: 'Profile',
  },
  {
    name: 'View Profile',
    url: '/dashboard/patient/profile',
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'Services',
    title: true,
  },
  {
    name: 'Appointments',
    url: 'dashboard/patients/appointments',
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'home',
    url: 'dashboard/patients/home'
  },
  {
    name: 'New Booking',
    url: 'dashboard/patients/view_doctors',
  },
];
