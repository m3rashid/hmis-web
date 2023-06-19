import { createQuery } from '@tanstack/solid-query';
import { Component, JSX, Show, Suspense, createSignal } from 'solid-js';
import apiService from '../../api/service';
import Loading from '../atoms/loading';
import Sidebar from './sidebar';
import { Icon } from 'solid-heroicons';
import {
  bars_3,
  bell,
  chevronDown,
  magnifyingGlass,
  xMark,
} from 'solid-heroicons/outline';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const AppLayout: Component<IProps> = (props) => {
  const [getSidebarOpen, setSidebarOpen] = createSignal(false);
  const [getUserPopoverOpen, setUserPopoverOpen] = createSignal(false);
  // const query = createQuery({
  //   queryKey: () => ['config'],
  //   queryFn: apiService('/config', 'GET'),
  // });

  return (
    <Suspense fallback={<Loading loading={true} />}>
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      <Show when={!getSidebarOpen()}>
        <div class='relative z-50 lg:hidden' role='dialog' aria-modal='true'>
          {/* <!--
						Off-canvas menu backdrop, show/hide based on off-canvas menu state.

						Entering: "transition-opacity ease-linear duration-300"
							From: "opacity-0"
							To: "opacity-100"
						Leaving: "transition-opacity ease-linear duration-300"
							From: "opacity-100"
							To: "opacity-0"
					--> */}
          <div class='fixed inset-0 bg-gray-900/80'></div>

          <div class='fixed inset-0 flex'>
            {/* <!--
							Off-canvas menu, show/hide based on off-canvas menu state.

							Entering: "transition ease-in-out duration-300 transform"
								From: "-translate-x-full"
								To: "translate-x-0"
							Leaving: "transition ease-in-out duration-300 transform"
								From: "translate-x-0"
								To: "-translate-x-full"
							--> */}
            <div class='relative mr-16 flex w-full max-w-xs flex-1'>
              {/* <!--
								Close button, show/hide based on off-canvas menu state.

								Entering: "ease-in-out duration-300"
									From: "opacity-0"
									To: "opacity-100"
								Leaving: "ease-in-out duration-300"
									From: "opacity-100"
									To: "opacity-0"
							--> */}
              <div class='absolute left-full top-0 flex w-16 justify-center pt-5'>
                <button
                  type='button'
                  class='-m-2.5 p-2.5'
                  onClick={() => setSidebarOpen((p) => !p)}
                >
                  <span class='sr-only'>Close sidebar</span>
                  <Icon path={xMark} class='w-6 text-white' />
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
      </Show>

      {/* <!-- Static sidebar for desktop --> */}
      <div class='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        <Sidebar />
      </div>

      <div class='lg:pl-72'>
        <div class='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
          <button
            type='button'
            class='-m-2.5 p-2.5 text-gray-700 lg:hidden'
            onClick={() => setSidebarOpen((p) => !p)}
          >
            <span class='sr-only'>Open sidebar</span>
            <Icon path={bars_3} class='w-5' />
          </button>

          {/* <!-- Separator --> */}
          <div
            class='h-6 w-px bg-gray-900/10 lg:hidden'
            aria-hidden='true'
          ></div>

          <div class='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
            <form class='relative flex flex-1' action='#' method='get'>
              <label for='search-field' class='sr-only'>
                Search
              </label>
              <Icon path={magnifyingGlass} class='w-5' />
              <input
                id='search-field'
                class='block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm'
                placeholder='Search...'
                type='search'
                name='search'
              />
            </form>
            <div class='flex items-center gap-x-4 lg:gap-x-6'>
              <button
                type='button'
                class='-m-2.5 p-2.5 text-gray-400 hover:text-gray-500'
              >
                <span class='sr-only'>View notifications</span>
                <Icon path={bell} class='w-5' />
              </button>

              {/* <!-- Separator --> */}
              <div
                class='hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10'
                aria-hidden='true'
              ></div>

              {/* <!-- Profile dropdown --> */}
              <div class='relative'>
                <button
                  type='button'
                  class='-m-1.5 flex items-center p-1.5'
                  id='user-menu-button'
                  aria-expanded='false'
                  aria-haspopup='true'
                  onClick={() => setUserPopoverOpen((p) => !p)}
                >
                  <span class='sr-only'>Open user menu</span>
                  <span class='flex h-8 w-8 rounded-full items-center justify-center bg-teal-500 text-sm text-black'>
                    TC
                  </span>
                  <span class='hidden lg:flex lg:items-center'>
                    <span
                      class='ml-4 text-sm font-semibold leading-6 text-gray-900'
                      aria-hidden='true'
                    >
                      Tom Cook
                    </span>
                    <Icon path={chevronDown} class='w-5' />
                  </span>
                </button>

                {/* <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}
                <Show when={getUserPopoverOpen()}>
                  <div
                    class='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu-button'
                    tabindex='-1'
                  >
                    {/* <!-- Active: "bg-gray-50", Not Active: "" --> */}
                    <a
                      href='#'
                      class='block px-3 py-1 text-sm leading-6 text-gray-900'
                      role='menuitem'
                      tabindex='-1'
                      id='user-menu-item-0'
                    >
                      Your profile
                    </a>
                    <a
                      href='#'
                      class='block px-3 py-1 text-sm leading-6 text-gray-900'
                      role='menuitem'
                      tabindex='-1'
                      id='user-menu-item-1'
                    >
                      Sign out
                    </a>
                  </div>
                </Show>
              </div>
            </div>
          </div>
        </div>

        <main class='py-2 sm:py-3 lg:py-4'>
          <div class='px-2 sm:px-3 lg:px-4'>{props.children}</div>
        </main>
      </div>
    </Suspense>
  );
};

export default AppLayout;
