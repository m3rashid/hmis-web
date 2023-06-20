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
import { Transition } from 'solid-transition-group';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const AppLayout: Component<IProps> = (props) => {
  const [getSidebarOpen, setSidebarOpen] = createSignal(false);
  // const query = createQuery({
  //   queryKey: () => ['config'],
  //   queryFn: apiService('/config', 'GET'),
  // });

  return (
    <Suspense fallback={<Loading loading={true} />}>
      <Show when={getSidebarOpen()}>
        <div class='relative z-50 lg:hidden' role='dialog' aria-modal='true'>
          {/* Off-canvas menu backdrop, show/hide based on off-canvas menu state */}
          <Transition
            appear
            enterActiveClass='opacity-0'
            enterToClass='opacity-100'
            exitActiveClass='opacity-100'
            exitToClass='opacity-0'
          >
            <div class='fixed inset-0 bg-gray-900/80 transition-opacity ease-linear duration-300'></div>
          </Transition>

          <div class='fixed inset-0 flex'>
            {/* Off-canvas menu, show/hide based on off-canvas menu state */}
            <Transition
              appear
              enterActiveClass='-translate-x-full'
              enterToClass='-translate-x-0'
              exitActiveClass='translate-x-0'
              exitToClass='-translate-x-full'
            >
              <div class='relative mr-16 flex w-full max-w-xs flex-1 transition ease-in-out duration-300 transform'>
                {/* Close button, show/hide based on off-canvas menu state */}
                <Transition
                  appear
                  enterActiveClass='opacity-0'
                  enterToClass='opacity-100'
                  exitActiveClass='opacity-100'
                  exitToClass='opacity-0'
                >
                  <div class='absolute left-full top-0 flex w-16 justify-center pt-5 ease-in-out duration-300'>
                    <button
                      type='button'
                      class='-m-2.5 p-2.5'
                      onClick={() => setSidebarOpen((p) => !p)}
                    >
                      <span class='sr-only'>Close sidebar</span>
                      <Icon path={xMark} class='w-6 text-white' />
                    </button>
                  </div>
                </Transition>
                <Sidebar />
              </div>
            </Transition>
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
