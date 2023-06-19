import { Component, For, Match, Show, Switch, createSignal } from 'solid-js';
import { IRoute } from './routes';
import { A } from '@solidjs/router';
import { Icon } from 'solid-heroicons';
import { chevronDown, chevronUp } from 'solid-heroicons/outline';

const SidebarDropdown: Component<IRoute> = (props) => {
  const [getDropdownOpen, setDropdownOpen] = createSignal(false);

  return (
    <div class='w-full'>
      <div
        onClick={() => setDropdownOpen((p) => !p)}
        class='flex items-center justify-between hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer'
      >
        <A
          href={props.link}
          class='text-gray-200 flex gap-x-3 text-sm leading-6 font-semibold'
        >
          <Icon path={props.icon} class='w-5' />
          {props.label}
        </A>

        <Switch>
          <Match when={getDropdownOpen()}>
            <Icon path={chevronUp} class='w-5 text-gray-200' />
          </Match>
          <Match when={!getDropdownOpen()}>
            <Icon path={chevronDown} class='w-5 text-gray-200' />
          </Match>
        </Switch>
      </div>

      {/* <!--
				Dropdown menu, show/hide based on menu state.

				Entering: "transition ease-out duration-100"
					From: "transform opacity-0 scale-95"
					To: "transform opacity-100 scale-100"
				Leaving: "transition ease-in duration-75"
					From: "transform opacity-100 scale-100"
					To: "transform opacity-0 scale-95"
				--> */}

      <Show when={getDropdownOpen()}>
        <div
          class='w-full pl-8 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='menu-button'
          tabindex='-1'
        >
          <div class='py-1' role='none'>
            {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
            <For each={props.nestedLinks}>
              {(nestedLink) => (
                <Show when={nestedLink.showInNav}>
                  <li>
                    <A
                      href={nestedLink.link}
                      class='text-gray-200 hover:bg-gray-700 group flex gap-x-3 rounded-md px-3 py-2 text-sm leading-6 font-semibold'
                    >
                      <Icon path={nestedLink.icon} class='w-5' />
                      {nestedLink.label}
                    </A>
                  </li>
                </Show>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default SidebarDropdown;
