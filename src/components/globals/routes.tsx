import {
  home,
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
  informationCircle,
  plusCircle,
  shieldCheck,
  userGroup,
  userPlus,
  users,
  user,
} from 'solid-heroicons/outline';

import { IAuth } from '../../context/auth';
import { JSX, lazy } from 'solid-js';
import { IconPath } from '../../helpers/types';

// App
const Home = lazy(() => import('../../pages/home'));
const About = lazy(() => import('../../pages/about'));
const Error = lazy(() => import('../../pages/error'));
const UnAuthenticated = lazy(() => import('../../pages/unAuthenticated'));

// Dashboard
const Dashboard = lazy(() => import('../../pages/dashboard'));

// Inventory
const Inventory = lazy(() => import('../../pages/inventory'));
const Consumable = lazy(() => import('../../pages/inventory/consumable'));
const NonConsumable = lazy(() => import('../../pages/inventory/nonConsumable'));
const RemovedConsumable = lazy(
  () => import('../../pages/inventory/removedConsumable')
);
const RemovedNonConsumable = lazy(
  () => import('../../pages/inventory/removedNonConsumable')
);

// Me
const Profile = lazy(() => import('../../pages/me/profile'));
const Settings = lazy(() => import('../../pages/me/settings'));

// Notifications
const Announcement = lazy(() => import('../../pages/announcement'));
const Notifications = lazy(() => import('../../pages/notifications'));

// Patient Management
const Patient = lazy(() => import('../../pages/patientManagement/patient'));
const PatientManagement = lazy(() => import('../../pages/patientManagement'));
const Appointment = lazy(
  () => import('../../pages/patientManagement/appointment')
);
const InPatient = lazy(() => import('../../pages/patientManagement/inPatient'));
const OutPatient = lazy(
  () => import('../../pages/patientManagement/outPatient')
);

// Services
const Services = lazy(() => import('../../pages/services'));
const Attendance = lazy(() => import('../../pages/services/attendance'));
const HealthInsurance = lazy(
  () => import('../../pages/services/healthInsurance')
);
const HospitalPackage = lazy(
  () => import('../../pages/services/hospitalPackage')
);
const Lab = lazy(() => import('../../pages/services/lab'));
const Payment = lazy(() => import('../../pages/services/payment'));

// App Settings
const User = lazy(() => import('../../pages/app/user'));
const App = lazy(() => import('../../pages/app'));
const Role = lazy(() => import('../../pages/app/role'));
const Permission = lazy(() => import('../../pages/app/permissions'));

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
    icon: informationCircle,
    label: 'About',
    link: '/about',
    showInNav: true,
    Component: About,
  },
  {
    icon: chartBarSquare,
    label: 'Dashboards',
    link: '/dashboard',
    Component: Dashboard,
    showInNav: true,
  },
  {
    icon: archiveBox,
    label: 'Inventory',
    showInNav: true,
    link: '/inventory',
    nestedLinks: [
      {
        icon: archiveBoxXMark,
        label: 'Home',
        link: '/inventory',
        Component: Inventory,
        showInNav: true,
      },
      {
        icon: archiveBoxXMark,
        label: 'Consumables',
        link: '/inventory/consumables',
        Component: Consumable,
        showInNav: true,
      },
      {
        icon: archiveBoxXMark,
        label: 'Non Consumables',
        link: '/inventory/non-consumables',
        Component: NonConsumable,
        showInNav: true,
      },
      {
        icon: archiveBoxXMark,
        label: 'Removed Consumables',
        link: '/inventory/consumables-removed',
        Component: RemovedConsumable,
        showInNav: false,
      },
      {
        icon: archiveBoxXMark,
        label: 'Removed Non Consumables',
        link: '/inventory/non-consumables-removed',
        Component: RemovedNonConsumable,
        showInNav: false,
      },
    ],
  },
  {
    icon: user,
    label: 'Me',
    link: '/me',
    showInNav: true,
    nestedLinks: [
      {
        icon: cog_6Tooth,
        label: 'Settings',
        link: '/me/settings',
        showInNav: true,
        Component: Settings,
      },
      {
        icon: user,
        label: 'Profile',
        link: '/profile',
        showInNav: true,
        Component: Profile,
      },
    ],
  },
  {
    icon: bookmarkSquare,
    label: 'Notice and Circulars',
    link: '/services/notices',
    Component: Notifications,
    showInNav: true,
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
      },
      {
        icon: users,
        label: 'Patients',
        link: '/patient/patients',
        Component: Patient,
        showInNav: true,
      },
      {
        icon: users,
        label: 'Appointments',
        link: '/patient/appointment',
        Component: Appointment,
        showInNav: true,
      },
      {
        icon: arrowUpOnSquare,
        label: 'Out Patient Department',
        link: '/patient/opd',
        Component: OutPatient,
        showInNav: true,
      },
      {
        icon: arrowDownOnSquare,
        label: 'In Patient Department',
        link: '/patient/ipd',
        Component: InPatient,
        showInNav: true,
      },
    ],
  },
  {
    icon: bookmarkSquare,
    label: 'Services',
    showInNav: true,
    link: '/services',
    nestedLinks: [
      {
        icon: bookmarkSquare,
        link: '/services/home',
        label: 'Services',
        Component: Services,
        showInNav: true,
      },
      {
        icon: users,
        label: 'Attendance',
        link: '/services/attendance',
        Component: Attendance,
        showInNav: true,
      },
      {
        icon: plusCircle,
        label: 'Health Insurance',
        link: '/services/health',
        Component: HealthInsurance,
        showInNav: true,
      },
      {
        icon: bookOpen,
        label: 'Hospital Packages',
        link: '/services/packages',
        Component: HospitalPackage,
        showInNav: true,
      },
      {
        icon: clipboardDocument,
        label: 'Lab Management',
        link: '/services/lab',
        Component: Lab,
        showInNav: true,
      },
      {
        icon: currencyRupee,
        label: 'Payments',
        link: '/services/payments',
        Component: Payment,
        showInNav: true,
      },
    ],
  },
  {
    icon: shieldCheck,
    label: 'App Settings',
    showInNav: true,
    link: '/app-settings',
    nestedLinks: [
      {
        icon: shieldCheck,
        label: 'App Settings',
        link: '/app-settings/home',
        Component: App,
        showInNav: true,
      },
      {
        icon: userPlus,
        label: 'Users',
        link: '/app-settings/users',
        Component: User,
        showInNav: true,
      },
      {
        icon: userGroup,
        label: 'Roles',
        link: '/app-settings/roles',
        Component: Role,
        showInNav: true,
      },
      {
        icon: userGroup,
        label: 'Roles',
        link: '/app-settings/permissions',
        Component: Permission,
        showInNav: true,
      },
    ],
  },
];
