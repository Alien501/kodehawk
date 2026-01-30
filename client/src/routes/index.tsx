import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import LoginPage from '@/pages/login/login'
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
