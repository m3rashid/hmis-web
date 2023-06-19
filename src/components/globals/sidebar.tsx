import { Component, For, Match, Show, Switch } from 'solid-js';
import { routes } from './routes';
import { Icon } from 'solid-heroicons';
import { A } from '@solidjs/router';
import SidebarDropdown from './sidebarDropDown';

const Sidebar: Component = () => {
  return (
    <div class='flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 bg-gray-800 border-r'>
      <div class='flex h-16 shrink-0 items-center'>
        <img
          class='h-8 w-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
          alt='Your Company'
        />
      </div>

      <nav class='flex flex-1 flex-col'>
        <ul role='list' class='flex flex-1 flex-col gap-y-7'>
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

          {/* <li>
            <div class='text-xs font-semibold leading-6 text-gray-400'>
              Your teams
            </div>
            <ul role='list' class='-mx-2 mt-2 space-y-1'>
              <li>
								<!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" -->
                <a
                  href='#'
                  class='text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                >
                  <span class='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white'>
                    H
                  </span>
                  <span class='truncate'>Heroicons</span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  class='text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                >
                  <span class='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white'>
                    T
                  </span>
                  <span class='truncate'>Tailwind Labs</span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  class='text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                >
                  <span class='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white'>
                    W
                  </span>
                  <span class='truncate'>Workcation</span>
                </a>
              </li>
            </ul>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
