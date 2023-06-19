import { Route, Routes } from '@solidjs/router';
import { For, type Component, Show, Switch, Match } from 'solid-js';
import { routes } from './components/globals/routes';

const App: Component = () => {
  return (
    <div>
      <Routes>
        <For each={routes}>
          {(route) => (
            <Switch>
              <Match when={route.nestedLinks}>
                <For each={route.nestedLinks}>
                  {(nestedLink) => (
                    <Show when={nestedLink.Component}>
                      <Route
                        path={nestedLink.link}
                        component={nestedLink.Component}
                      />
                    </Show>
                  )}
                </For>
              </Match>

              <Match when={!route.nestedLinks && route.Component}>
                <Route path={route.link} component={route.Component} />
              </Match>
            </Switch>
          )}
        </For>
      </Routes>
    </div>
  );
};

export default App;
