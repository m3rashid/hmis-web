import {
  archiveBox,
  archiveBoxXMark,
  arrowDownOnSquare,
  arrowUpOnSquare,
  bookOpen,
  bookmarkSquare,
  chartBarSquare,
  clipboardDocument,
  cog_6Tooth,
  currencyRupee,
  fingerPrint,
  home,
  informationCircle,
  plusCircle,
  shieldCheck,
  squaresPlus,
  userGroup,
  userPlus,
  users,
} from 'solid-heroicons/outline';

import { IAuth } from '../../context/auth';
import { JSX, lazy } from 'solid-js';
import { IconPath } from '../../helpers/types';

const Home = lazy(() => import('../../pages/home'));
const About = lazy(() => import('../../pages/about'));
const Error = lazy(() => import('../../pages/error'));
const Settings = lazy(() => import('../../pages/settings'));
const Payments = lazy(() => import('../../pages/payments'));
const LabManagement = lazy(() => import('../../pages/lab'));
const Dashboard = lazy(() => import('../../pages/dashboard'));
const PatientManagement = lazy(() => import('../../pages/patient'));
const Notifications = lazy(() => import('../../pages/notifications'));
const InPatientDepartment = lazy(() => import('../../pages/inPatient'));
const AttendanceManagement = lazy(() => import('../../pages/attendance'));
const OutPatientDepartment = lazy(() => import('../../pages/outPatient'));
const HospitalPackage = lazy(() => import('../../pages/hospitalPackage'));
const Consumables = lazy(() => import('../../pages/inventory/consumables'));
const UserManagement = lazy(() => import('../../pages/userManagement/user'));
const RoleManagement = lazy(() => import('../../pages/userManagement/role'));
const NonConsumables = lazy(
  () => import('../../pages/inventory/nonConsumables')
);
const HealthInsuranceManagement = lazy(
  () => import('../../pages/healthInsurance')
);
const RemovedConsumables = lazy(
  () => import('../../pages/inventory/removedConsumables')
);
const RemovedNonConsumables = lazy(
  () => import('../../pages/inventory/removedNonConsumables')
);

export const resourceTypes = [
  'USER',
  'PROFILE',
  'ADDRESS',
  'PERMISSION',
  'ROLE',
  'AVAILABILITY',
  'LEAVE',
  'APPOINTMENT',
  'CONSUMABLES',
  'NON_CONSUMABLES',
  'PRESCRIPTION',
  'CONFIG',
  'ATTENDANCE',
] as const;

interface IPermission {
  resource: (typeof resourceTypes)[number];
  action: string;
}

export type IRoute = {
  icon: IconPath;
  label: string;
  link: string;
  Component?: (props: any) => JSX.Element;
  showInNav: boolean;
  permission?: IPermission;
  nestedLinks?: Array<{
    icon: IconPath;
    label: string;
    link: string;
    Component: (props: any) => JSX.Element;
    showInNav: boolean;
    permission?: IPermission;
  }>;
};

export const checkAccess = (auth: IAuth, permission?: IPermission) => {
  if (!auth.isLoggedIn) return false;
  if (!permission) return true;
  // TODO: check permissions here
  return true;
};

export const routes: Array<IRoute> = [
  {
    icon: home,
    label: 'Home',
    link: '/',
    Component: Home,
    showInNav: true,
  },
  {
    icon: shieldCheck,
    label: 'Permission Management',
    showInNav: true,
    link: '/users',
    nestedLinks: [
      {
        icon: userPlus,
        label: 'Users',
        link: '/users/users',
        Component: UserManagement,
        permission: { resource: 'USER', action: 'READ' },
        showInNav: true,
      },
      {
        icon: userGroup,
        label: 'Roles',
        link: '/users/roles',
        permission: { resource: 'ROLE', action: 'READ' },
        Component: RoleManagement,
        showInNav: true,
      },
    ],
  },
  {
    icon: fingerPrint,
    label: 'Patient Management',
    showInNav: true,
    link: '/patient',
    nestedLinks: [
      {
        icon: home,
        label: 'Patient Home',
        link: '/patient/home',
        Component: PatientManagement,
        showInNav: true,
        permission: { resource: 'USER', action: 'READ' },
      },
      {
        icon: arrowUpOnSquare,
        label: 'Out Patient Department',
        link: '/patient/opd',
        Component: OutPatientDepartment,
        showInNav: true,
        permission: { resource: 'USER', action: 'READ' },
      },
      {
        icon: arrowDownOnSquare,
        label: 'In Patient Department',
        link: '/patient/ipd',
        Component: InPatientDepartment,
        showInNav: true,
        permission: { resource: 'USER', action: 'READ' },
      },
    ],
  },
  {
    icon: archiveBox,
    label: 'Inventory',
    showInNav: true,
    link: '/inventory',
    nestedLinks: [
      {
        icon: archiveBoxXMark,
        label: 'Consumables',
        link: '/inventory/consumables',
        Component: Consumables,
        showInNav: true,
        permission: { resource: 'CONSUMABLES', action: 'READ' },
      },
      {
        icon: archiveBoxXMark,
        label: 'Non Consumables',
        link: '/inventory/non-consumables',
        Component: NonConsumables,
        showInNav: true,
        permission: { resource: 'NON_CONSUMABLES', action: 'READ' },
      },
      {
        icon: archiveBoxXMark,
        label: 'Removed Consumables',
        link: '/inventory/consumables-removed',
        Component: RemovedConsumables,
        permission: { resource: 'CONSUMABLES', action: 'READ' },
        showInNav: false,
      },
      {
        icon: archiveBoxXMark,
        label: 'Removed Non Consumables',
        link: '/inventory/non-consumables-removed',
        Component: RemovedNonConsumables,
        permission: { resource: 'NON_CONSUMABLES', action: 'READ' },
        showInNav: false,
      },
    ],
  },
  {
    icon: clipboardDocument,
    label: 'Lab Management',
    link: '/lab',
    Component: LabManagement,
    showInNav: true,
    permission: { resource: 'USER', action: 'READ' },
  },
  {
    icon: squaresPlus,
    label: 'Services',
    showInNav: true,
    link: '/services',
    nestedLinks: [
      {
        icon: currencyRupee,
        label: 'Payments',
        link: '/services/payments',
        Component: Payments,
        showInNav: true,
        permission: { resource: 'USER', action: 'READ' },
      },
      {
        icon: plusCircle,
        label: 'Health Insurance',
        link: '/services/health',
        Component: HealthInsuranceManagement,
        showInNav: true,
        permission: { resource: 'USER', action: 'READ' },
      },
      {
        icon: chartBarSquare,
        label: 'Dashboards',
        link: '/services/dashboards',
        Component: Dashboard,
        showInNav: true,
        permission: { resource: 'USER', action: 'READ' },
      },
      {
        icon: users,
        label: 'Attendance',
        link: '/services/attendance',
        Component: AttendanceManagement,
        showInNav: true,
        permission: { resource: 'ATTENDANCE', action: 'READ' },
      },
      {
        icon: bookmarkSquare,
        label: 'Notice and Circulars',
        link: '/services/notices',
        Component: Notifications,
        showInNav: true,
        permission: { resource: 'USER', action: 'READ' },
      },
    ],
  },
  {
    icon: bookOpen,
    label: 'Packages',
    link: '/packages',
    Component: HospitalPackage,
    showInNav: true,
    permission: { resource: 'USER', action: 'READ' },
  },
  {
    icon: cog_6Tooth,
    label: 'Settings',
    link: '/settings',
    showInNav: true,
    permission: { resource: 'USER', action: 'READ' },
    Component: Settings,
  },
  {
    icon: informationCircle,
    label: 'About',
    link: '/about',
    showInNav: true,
    Component: About,
  },
  {
    icon: informationCircle,
    label: 'Error',
    link: '/error',
    showInNav: false,
    Component: Error,
  },
];
