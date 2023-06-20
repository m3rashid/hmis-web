import { Component, For, Match, Switch } from 'solid-js';
import { routes } from './routes';
import { Icon } from 'solid-heroicons';
import { A } from '@solidjs/router';
import SidebarDropdown from './sidebarDropDown';
import UserActions from './userActions';

const Sidebar: Component = () => {
  return (
    <div class='flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 bg-gray-800'>
      <div class='flex h-16 shrink-0 items-center'>
        <img class='h-8 w-auto' src='/logo.png' alt='Your Company' />
      </div>

      <nav class='flex flex-1 flex-col'>
        <ul role='list' class='flex flex-1 flex-col justify-between'>
          <li>
            <ul role='list' class='-mx-2 space-y-1'>
              <For each={routes}>
                {(route) => (
                  <Switch>
                    <Match when={route.nestedLinks}>
                      <SidebarDropdown
                        icon={route.icon}
                        label={route.label}
                        link={route.link}
                        showInNav={route.showInNav}
                        nestedLinks={route.nestedLinks}
                        permission={route.permission}
                      />
                    </Match>
                    <Match when={!route.nestedLinks}>
                      <li>
                        <A
                          href={route.link}
                          class='text-gray-200 hover:bg-gray-700 group flex gap-x-3 rounded-md px-3 py-2 text-sm leading-6 font-semibold'
                        >
                          <Icon path={route.icon} class='w-5' />
                          {route.label}
                        </A>
                      </li>
                    </Match>
                  </Switch>
                )}
              </For>
            </ul>
          </li>

          <UserActions />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
