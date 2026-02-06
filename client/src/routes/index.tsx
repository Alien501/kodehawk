import { createFileRoute } from '@tanstack/react-router'
import PromptPage from '@/pages/prompt'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <PromptPage />
    </>
  )
}
