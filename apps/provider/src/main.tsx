import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';
import { AppShell, FeatureGrid } from '@sona/ui';
import '@sona/ui/styles.css';
const rootRoute = createRootRoute({ component: () => <Outlet /> });
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: ProviderHome });
const router = createRouter({ routeTree: rootRoute.addChildren([indexRoute]) });
function ProviderHome() {
  return (
    <AppShell
      title="Care teams, in flow."
      audience="Provider workspace"
      actions={
        <a className="button secondary" href="/">
          Provider sign in
        </a>
      }
    >
      <p className="lede">
        A focused clinical workspace for schedules, patient context, documentation, and coordinated follow-up.
      </p>
      <div className="actions">
        <a className="button" href="/">
          Open today’s schedule
        </a>
      </div>
      <FeatureGrid
        items={[
          {
            title: 'A clear clinical day',
            description: 'See appointments, priorities, and handoffs without losing the thread.',
          },
          {
            title: 'Patient context',
            description: 'Reach the right health information with role-based access and audited reads.',
          },
          {
            title: 'Safe collaboration',
            description: 'Coordinate care while keeping disclosures deliberate and traceable.',
          },
        ]}
      />
    </AppShell>
  );
}
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
