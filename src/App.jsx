import { useEffect, useState } from 'react'
import './App.css'
import Todo from './todo'
import DarkModeToggle from './DarkModeToggle'

function App() {
const [darkMode,setDarkMode]=useState(false)

//load saved prefrence
useEffect(()=>{
    const saved =localStorage.getItem('darkMode')=='true'
    setDarkMode(saved)
},[])
//apply mode and save prefrence
useEffect(()=>{
    localStorage.setItem('darkMode',darkMode)
    if(darkMode){
        document.documentElement.classList.add('dark')
    }else{
        document.documentElement.classList.remove('dark')
    }
},[darkMode])
  // ====== PWA Service Worker Registration ======
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(() => console.log('✅ Service Worker Registered'))
          .catch((err) =>
            console.log('❌ Service Worker registration failed:', err)
          )
      })
    }
  }, [])
  return(
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Todo App</h1>

        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
    <Todo/>
    </div>
  )
}

export default App
