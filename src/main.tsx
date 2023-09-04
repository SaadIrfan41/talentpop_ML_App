import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import ErrorPage from './pages/404.tsx'
import Login from './pages/login.tsx'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/AuthRoute/ProtectedRoute.tsx'
import PublicRoute from './components/AuthRoute/PublicRoute.tsx'
import HomePage from './App.tsx'
import CandidateDashboard from '@/pages/candidate-dashboard.tsx'
import AppLayout from './components/AppLayout.tsx'
import Analytics from './pages/Analytics.tsx'
import AdminDashboard from './pages/admin-dashboard.tsx'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/candidate-dashboard',
        element: (
          <ProtectedRoute>
            <CandidateDashboard />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin-dashboard',
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/analytics',
        element: (
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },

      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
)
