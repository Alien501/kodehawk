import LoginPage from '@/pages/login/login'
import { codeHawkStore } from '@/lib/codehawk-store'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  beforeLoad: () => {
    if (codeHawkStore.state.auth.isAuthenticated) {
      throw redirect({ to: '/codehawk' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginPage />
}
