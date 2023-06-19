/* @refresh reload */
import { render } from 'solid-js/web';

import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

import './index.css';
import App from './App';
import { UiContextProvider } from './context/ui';
import { AuthContextProvider } from './context/auth';
import { Router } from '@solidjs/router';
import AppLayout from './components/globals/layout';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelt?'
  );
}

const queryClient = new QueryClient();

render(
  () => (
    <Router>
      <QueryClientProvider client={queryClient}>
        <UiContextProvider>
          <AuthContextProvider>
            <AppLayout>
              <App />
            </AppLayout>
          </AuthContextProvider>
        </UiContextProvider>
      </QueryClientProvider>
    </Router>
  ),
  root!
);
