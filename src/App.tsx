import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LandingPage } from "./pages/landing-page"
import { LoginPage } from "./pages/login-page"
import { RegisterPage } from "./pages/register-page"
import { CoursesPage } from "./pages/courses-page"
import { CourseDetailPage } from "./pages/course-detail-page"
import { CartPage } from "./pages/cart-page"
import { ThankYouPage } from "./pages/thank-you-page"
import { DashboardPage } from "./pages/dashboard-page"
import { LiveSessionPage } from "./pages/live-session-page"
import { AchievementsPage } from "./pages/achievements-page"
import { AccountSettingsPage } from "./pages/account-settings-page"
import { CoursePlayerPage } from "./pages/course-player-page"
import { CalendarPage } from "./pages/calendar-page"
import { ProtectedRoute } from "./components/protected-route"
import { AdminRoute } from "./components/admin-route"
import { ScrollToTop } from "./components/scroll-to-top"
import { AdminDashboardPage } from "./pages/admin-dashboard-page"
import { AdminSessionsPage } from "./pages/admin-sessions-page"
import { AdminCourseStudentsPage } from "./pages/admin-course-students-page"

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/cursos" element={<CoursesPage />} />
        <Route path="/cursos/:id" element={<CourseDetailPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route
          path="/checkout/confirmacion"
          element={
            <ProtectedRoute>
              <ThankYouPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/curso/:id"
          element={
            <ProtectedRoute>
              <CoursePlayerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/sesion-en-vivo/:id"
          element={
            <ProtectedRoute>
              <LiveSessionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/logros"
          element={
            <ProtectedRoute>
              <AchievementsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/calendario"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/cuenta"
          element={
            <ProtectedRoute>
              <AccountSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/sesiones"
          element={
            <AdminRoute>
              <AdminSessionsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/cursos/:id"
          element={
            <AdminRoute>
              <AdminCourseStudentsPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
