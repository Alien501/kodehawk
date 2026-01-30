import LoadingPage from '@/pages/loading'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/loading')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoadingPage />
}
