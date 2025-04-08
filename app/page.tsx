'use client'
import { useState } from 'react'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

export default function Home() {
  const [darkMode, setDarkMode] = useState(true)
  const [showChat, setShowChat] = useState(false)

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <About />
      <Projects />
      <Certificates />
      <Experience />
      <Skills />
      <ChatWidget showChat={showChat} setShowChat={setShowChat} />
      <Footer />
    </>
  )
}
