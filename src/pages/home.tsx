import { Icon } from 'solid-heroicons';
import type { Component } from 'solid-js';
import { configDefaultState } from '../context/config';
import { archiveBox, user, userPlus } from 'solid-heroicons/outline';

export const featuresData = [
  {
    key: '1',
    title: 'OPD (Out Patient Department)',
    icon: user,
    description:
      'Appointments/ Single-Time interactions with Discrete History Management',
  },
  {
    key: '3',
    title: 'Inventory Management',
    icon: archiveBox,
    description:
      'Centralized Inventory Management with consumables and non-consumables segregation',
  },
  {
    key: '2',
    title: 'IPD (In Patient Department)',
    icon: userPlus,
    description:
      'Department agnostic/Specific Continuous Patient Journey with all Operations and surgeries management already built in',
  },
  {
    key: '4',
    title: 'Lab Management',
    icon: userPlus,
    description:
      'Centralized Lab Management with Scannable Test Reports to generate E-Docs, Test Reports, Analysis and integration with testing machines',
  },
  {
    key: '5',
    title: 'Dashboards (Insights and Analytics)',
    icon: userPlus,
    description:
      'Insights about hospital performance, assets utilization, patient behavior etc.',
  },
  {
    key: '6',
    title: 'Patient Management',
    icon: userPlus,
    description:
      'Patient management with features like behavior tracking, navigation history, etc. to make the patient journey seamless',
  },
  {
    key: '7',
    title: 'Payments',
    icon: userPlus,
    description: 'Payment Integration with Skip/Configurable Payments',
  },
  {
    key: '8',
    title: 'Hospital Package Creator',
    icon: userPlus,
    description:
      'Create your own packages of Health Checkups, surgeries for better Cost Analysis',
  },
  {
    key: '9',
    title: 'Health Insurance',
    icon: userPlus,
    description:
      'Integration with Health Insurance Companies and Govt. for Health IDs',
  },
  {
    key: '10',
    title: 'Other Features',
    icon: userPlus,
    description:
      'Patient options for nearest hospital selection (tenant based)',
  },
];

const Home: Component = () => {
  return (
    <div class='bg-white dark:bg-black'>
      <div class='py-20 sm:py-40'>
        <div class='isolate mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center sm:gap-8'>
          <div class='text-center'>
            <h1 class='text-4xl font-bold tracking-tight text-black dark:text-gray-50 sm:text-6xl'>
              {configDefaultState.app.fullName}
            </h1>
            <p class='mt-6 text-lg leading-8 text-black dark:text-gray-400'>
              We aim to build world class smart digital hospitals. Connected,
              reliable and integral healthcare softwares for all your needs
            </p>
          </div>

          <img class='max-w-[500px]' src='/images/hospital.png' />
        </div>
        BU
      </div>

      <div class='py-6 sm:py-16'>
        <div class='mx-auto max-w-7xl px-6 lg:px-8'>
          <div class='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            <div>
              <p class='text-base font-semibold leading-7 text-gray-600 dark:text-gray-400'>
                Everything you need
              </p>
              <p class='mt-2 text-3xl font-bold tracking-tight text-black dark:text-gray-100 sm:text-4xl'>
                All-in-one platform
              </p>

              <br />
              <br />

              <p class='mt-6 text-base leading-7 text-gray-600 dark:text-gray-400'>
                A complete one stop solution for all your hospital needs. Make
                your hospital digital and manage all your hospital needs from
                one centralized place.
              </p>
            </div>
            <dl class='col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16'>
              {featuresData.map((feat) => (
                <div class='relative pl-9'>
                  <dt class='font-semibold text-black dark:text-gray-100'>
                    <Icon
                      path={feat.icon}
                      class='absolute left-0 top-1 h-5 w-5 text-indigo-500'
                    />
                    <p class='text-black dark:text-gray-100'>{feat.title}</p>
                  </dt>

                  <dd class='mt-2'>
                    <p class='text-gray-600 dark:text-gray-400'>
                      {feat.description}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
