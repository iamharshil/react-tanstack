# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

This is vite + react + tanstack router setup.

To use Tanstack in existing project.

1. Install the required packages:

    ```bash
    bun add @tanstack/react-router-devtools @tanstack/react-router
    ```

2. Set up `main.tsx` content like below:

    ```tsx
    import { createRouter, RouterProvider } from '@tanstack/react-router'
    import { StrictMode } from 'react'
    import ReactDOM from 'react-dom/client'
    import "./main.css"

    // Import the generated route tree
    import { routeTree } from './routeTree.gen'

    // Create a new router instance
    const router = createRouter({ routeTree })

    // Register the router instance for type safety
    declare module '@tanstack/react-router' {
      interface Register {
        router: typeof router
      }
    }

    // Render the app
    const rootElement = document.getElementById('root')!
    if (!rootElement.innerHTML) {
      const root = ReactDOM.createRoot(rootElement)
      root.render(
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>,
      )
    }
    ```

3. Create a `routes` folder in `src` and add `__root.tsx` file with the following content:

    ```tsx
    import { createRootRoute, Outlet } from '@tanstack/react-router'
    import * as React from 'react'

    export const Route = createRootRoute({
      component: RootComponent,
    })

    function RootComponent() {
      return (
        <React.Fragment>
          <div>Hello "__root"!</div>
          <Outlet />
        </React.Fragment>
      )
    }

    ```
4. Create an `index.tsx` file in the `routes` folder with the following content:

    ```tsx
    import { createRoute } from '@tanstack/react-router'
    import * as React from 'react'
    import { Route as RootRoute } from './__root'

    export const Route = createRoute({
      getParentRoute: () => RootRoute,
    })

    export function Component() {
      return <div>Hello "index"!</div>
    }
    ```

     - This creates file based routing with a root route and an index route.s
     - It's similar to Next.js pages structure.
  
5. Dynamic routes can be created by using $ before the file name.

    - For example, to create a dynamic route for user profiles, create a file named `$userId.tsx` in the `routes`.

6. Fetch data in the route using `loader`.

    ```tsx
    import { createRoute } from '@tanstack/react-router'
    import * as React from 'react'
    import { Route as RootRoute } from './__root'

    export const Route = createRoute({
      getParentRoute: () => RootRoute,
      loader: async ({ params }) => {
        const response = await fetch(`https://api.example.com/user/${params.userId}`)
        const userData = await response.json()
        return { userData }
      },
    })

    export function Component({ loaderData }) {
      return <div>User Name: {loaderData.userData.name}</div>
    }
    ```