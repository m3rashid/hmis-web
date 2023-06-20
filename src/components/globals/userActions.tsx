import { Icon } from 'solid-heroicons';
import { user } from 'solid-heroicons/outline';
import { Component, For, Match, Show, Switch, createSignal } from 'solid-js';
import { useAuth } from '../../context/auth';
import { IconPath } from '../../helpers/types';
import { A } from '@solidjs/router';

interface IOption {
  icon: IconPath;
  label: string;
  action?: () => void;
  href?: string;
}

const options: IOption[] = [
  {
    icon: user,
    label: 'Logout',
    action: () => {},
  },
  {
    icon: user,
    label: 'Profile',
    href: '/profile',
  },
];

const UserActions: Component = () => {
  const [getAuth, setAuth] = useAuth();
  const [getUserPopoverOpen, setUserPopoverOpen] = createSignal(false);

  return (
    <li>
      <div class='font-semibold leading-6'></div>

      <ul role='list' class='-mx-2 mt-2 space-y-1'>
        <For each={options}>
          {(option) => (
            <li>
              <Switch>
                <Match when={option.href}>
                  <A
                    href={option.href!}
                    class='text-gray-200 hover:bg-gray-700 group flex gap-x-3 rounded-md px-3 py-2 text-sm leading-6 font-semibold'
                  >
                    <Icon path={option.icon} class='w-5' />
                    {option.label}
                  </A>
                </Match>
                <Match when={option.action}>
                  <div
                    class='text-gray-200 hover:bg-gray-700 group flex gap-x-3 rounded-md px-3 py-2 text-sm leading-6 font-semibold cursor-pointer'
                    onClick={option.action}
                  >
                    <Icon path={option.icon} class='w-5' />
                    {option.label}
                  </div>
                </Match>
              </Switch>
            </li>
          )}
        </For>
      </ul>
    </li>
  );
};

export default UserActions;
