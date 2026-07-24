import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './styles/App.css'
import { BackgroundAudioProvider } from './components/BackgroundAudioManager'
import HomeLanguageSelector from './components/HomeLanguageSelector'
import MuteToggleButton from './components/MuteToggleButton'
import SiteLayout from './components/SiteLayout'
import ScrollToTop from './components/ScrollToTop'
import { homePageLanguageStorageKey } from './content/siteContent'
import ContactPage from './pages/ContactPage'
import DancePage from './pages/DancePage'
import ExperiencePage from './pages/ExperiencePage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import ReadyPage from './pages/ReadyPage'

const DEFAULT_HOME_LANGUAGE = 'en'

function getInitialHomeLanguage() {
  if (typeof window === 'undefined') {
    return DEFAULT_HOME_LANGUAGE
  }

  const savedLanguage = window.localStorage.getItem(homePageLanguageStorageKey)

  return savedLanguage === 'zh' ? 'zh' : DEFAULT_HOME_LANGUAGE
}

function App() {
  const [homeLanguage, setHomeLanguage] = useState(getInitialHomeLanguage)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(homePageLanguageStorageKey, homeLanguage)
  }, [homeLanguage])

  return (
    <BackgroundAudioProvider>
      <MuteToggleButton />
      <HomeLanguageSelector language={homeLanguage} onLanguageChange={setHomeLanguage} />
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout language={homeLanguage} onLanguageChange={setHomeLanguage} />}>
          <Route index element={<HomePage language={homeLanguage} />} />
          <Route path="profile" element={<ProfilePage language={homeLanguage} />} />
          <Route path="experience" element={<ExperiencePage language={homeLanguage} />} />
          <Route path="ready" element={<ReadyPage language={homeLanguage} />} />
          <Route path="dance" element={<DancePage />} />
          <Route path="contact" element={<ContactPage language={homeLanguage} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BackgroundAudioProvider>
  )
}

export default App
