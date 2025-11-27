import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Link activeProps={{ className: "text-blue-500 font-bold" }} to='/'> {/* Here it will type safe and suggest routes */}
        Main Page
      </Link>
      <Link activeProps={{ className: "text-blue-500 font-bold" }} to='/blog'>
        Blog page
      </Link>
      <Outlet />
    </React.Fragment>
  )
}
