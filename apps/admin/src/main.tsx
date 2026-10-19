import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';
import { AppShell, FeatureGrid } from '@sona/ui';
import '@sona/ui/styles.css';
const rootRoute = createRootRoute({ component: () => <Outlet /> });
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: AdminHome });
const router = createRouter({ routeTree: rootRoute.addChildren([indexRoute]) });
function AdminHome() {
  return (
    <AppShell
      title="Trust, made operational."
      audience="Administration"
      actions={
        <a className="button secondary" href="/">
          Secure sign in
        </a>
      }
    >
      <p className="lede">
        Manage access, operations, risk, and platform health from a deliberately separated control plane.
      </p>
      <div className="actions">
        <a className="button" href="/">
          Enter console
        </a>
      </div>
      <FeatureGrid
        items={[
          {
            title: 'Access governance',
            description: 'Manage staff roles, permissions, MFA posture, and lifecycle reviews.',
          },
          {
            title: 'Audit and privacy',
            description: 'Review PHI access, emergency grants, and security events in one queue.',
          },
          {
            title: 'Service operations',
            description: 'Monitor care delivery workflows without exposing unnecessary clinical detail.',
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
