import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/scenes')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-transparent my-0 mx-auto pl-5 overflow-hidden">
      <Outlet />
    </div>
  )
}
