import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
  RouterProvider,
} from '@tanstack/react-router';
import { CreateAccountPage, ResetPasswordPage, SignInPage, VerifyEmailPage } from './pages/auth';
import { DashboardPage } from './pages/dashboard';
import { LandingPage } from './pages/landing';
import { OnboardingPage } from './pages/onboarding';
import { SupportPage } from './pages/support';
import { hasSession } from './lib/session';
import './styles.css';

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('/sw.js');
  });
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
const requireSession = () => {
  if (!hasSession()) throw redirect({ to: '/sign-in' });
};
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: LandingPage });
const signInRoute = createRoute({ getParentRoute: () => rootRoute, path: '/sign-in', component: SignInPage });
const createAccountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create-account',
  component: CreateAccountPage,
});
const verifyEmailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/verify-email',
  component: VerifyEmailPage,
});
const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reset-password',
  component: ResetPasswordPage,
});
const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/onboarding',
  beforeLoad: requireSession,
  component: OnboardingPage,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  beforeLoad: requireSession,
  component: DashboardPage,
});
const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app/support',
  beforeLoad: requireSession,
  component: SupportPage,
});
const router = createRouter({
  routeTree: rootRoute.addChildren([
    indexRoute,
    signInRoute,
    createAccountRoute,
    verifyEmailRoute,
    resetPasswordRoute,
    onboardingRoute,
    dashboardRoute,
    supportRoute,
  ]),
  defaultPreload: 'intent',
  scrollRestoration: true,
});
const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, retry: 1 } } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
