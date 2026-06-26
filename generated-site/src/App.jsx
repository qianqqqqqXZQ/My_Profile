import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SiteLayout from './components/SiteLayout'
import ScrollToTop from './components/ScrollToTop'
import ContactPage from './pages/ContactPage'
import DancePage from './pages/DancePage'
import ExperiencePage from './pages/ExperiencePage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import ReadyPage from './pages/ReadyPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="ready" element={<ReadyPage />} />
          <Route path="dance" element={<DancePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
