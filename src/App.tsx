import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { Spinner } from '@/components/ui/Spinner'

// Pages publiques
const Home          = lazy(() => import('@/pages/public/Home'))
const About         = lazy(() => import('@/pages/public/About'))
const MotMinistre   = lazy(() => import('@/pages/public/MotMinistre'))
const Missions      = lazy(() => import('@/pages/public/Missions'))
const Organigramme  = lazy(() => import('@/pages/public/Organigramme'))
const News          = lazy(() => import('@/pages/public/News'))
const NewsDetail    = lazy(() => import('@/pages/public/NewsDetail'))
const Projects      = lazy(() => import('@/pages/public/Projects'))
const ProjectDetail = lazy(() => import('@/pages/public/ProjectDetail'))
const Documents     = lazy(() => import('@/pages/public/Documents'))
const Contact       = lazy(() => import('@/pages/public/Contact'))

// Pages admin
const Login          = lazy(() => import('@/pages/admin/Login'))
const Dashboard      = lazy(() => import('@/pages/admin/Dashboard'))
const NewsManager    = lazy(() => import('@/pages/admin/NewsManager'))
const ProjectsManager = lazy(() => import('@/pages/admin/ProjectsManager'))
const DocumentsManager = lazy(() => import('@/pages/admin/DocumentsManager'))
const GalleryManager  = lazy(() => import('@/pages/admin/GalleryManager'))
const MessagesManager = lazy(() => import('@/pages/admin/MessagesManager'))
const UsersManager   = lazy(() => import('@/pages/admin/UsersManager'))

const qc = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
})

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <Spinner className="min-h-screen" />
  if (!user) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Suspense fallback={<Spinner className="min-h-screen" />}>
      <Routes>
        {/* Site public */}
        <Route element={<PublicLayout />}>
          <Route path="/"                  element={<Home />} />
          <Route path="/ministere"                  element={<About />} />
          <Route path="/ministere/mot-ministre"    element={<MotMinistre />} />
          <Route path="/ministere/missions"        element={<Missions />} />
          <Route path="/ministere/organigramme"    element={<Organigramme />} />
          <Route path="/actualites"        element={<News />} />
          <Route path="/actualites/:id"    element={<NewsDetail />} />
          <Route path="/projets"           element={<Projects />} />
          <Route path="/projets/:id"       element={<ProjectDetail />} />
          <Route path="/documents"         element={<Documents />} />
          <Route path="/contact"           element={<Contact />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
        >
          <Route index element={<Dashboard />} />
          <Route path="actualites"   element={<NewsManager />} />
          <Route path="projets"      element={<ProjectsManager />} />
          <Route path="documents"    element={<DocumentsManager />} />
          <Route path="galerie"      element={<GalleryManager />} />
          <Route path="messages"     element={<MessagesManager />} />
          <Route path="utilisateurs" element={<UsersManager />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}
