import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';
import { AppShell, FeatureGrid } from '@sona/ui';
import '@sona/ui/styles.css';
const rootRoute = createRootRoute({ component: () => <Outlet /> });
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: BlogHome });
const router = createRouter({ routeTree: rootRoute.addChildren([indexRoute]) });
function BlogHome() {
  return (
    <AppShell
      title="Better health starts with clarity."
      audience="Health journal"
      actions={
        <a className="button secondary" href="/">
          Browse topics
        </a>
      }
    >
      <p className="lede">
        Evidence-aware guides, thoughtful stories, and practical tools for making informed health decisions.
      </p>
      <div className="actions">
        <a className="button" href="/">
          Read the latest
        </a>
      </div>
      <FeatureGrid
        items={[
          {
            title: 'Everyday wellbeing',
            description: 'Useful, approachable guidance for building healthier routines.',
          },
          {
            title: 'Understanding care',
            description: 'Plain-language explainers for visits, tests, medicines, and treatment choices.',
          },
          {
            title: 'From our clinicians',
            description: 'Perspectives from professionals who care about context, not just symptoms.',
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
