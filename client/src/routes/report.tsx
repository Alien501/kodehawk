import ReportPage from '@/pages/report'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/report')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ReportPage />
}
