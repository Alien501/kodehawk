import ReportPage from '@/pages/report'
import { codeHawkStore } from '@/lib/codehawk-store'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/report')({
  beforeLoad: ({ location }) => {
    if (!codeHawkStore.state.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: `${location.pathname}${location.searchStr}` },
      })
    }

    if (!codeHawkStore.state.latestReport) {
      throw redirect({ to: '/codehawk' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <ReportPage />
}
