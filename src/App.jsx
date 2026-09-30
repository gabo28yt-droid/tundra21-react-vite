import { useState } from 'react'
import { Home, CheckSquare, Calendar, Clock, Settings, Book } from 'lucide-react'
import Tasks from './components/Tasks'
import CalendarView from './components/Calendar'
import Routines from './components/Routines'
import Finance from './components/Finance'
import Pomodoro from './components/Pomodoro'
import Study from './components/Study'
import HomeView from './components/Home'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  const renderSection = () => {
    switch(activeSection) {
      case 'tasks':
        return <Tasks />
      case 'calendar':
        return <CalendarView />
      case 'routines':
        return <Routines />
      case 'finance':
        return <Finance />
      case 'pomodoro':
        return <Pomodoro />
      case 'study':
        return <Study />
      case 'home':
      default:
        return <HomeView />
    }
  }

  return (
    <div className="app">
      <div className="content">
        {renderSection()}
      </div>
      <nav className="navbar">
        <NavItem 
          icon={Home} 
          label="Home" 
          active={activeSection === 'home'} 
          onClick={() => setActiveSection('home')} 
        />
        <NavItem 
          icon={CheckSquare} 
          label="Tasks" 
          active={activeSection === 'tasks'} 
          onClick={() => setActiveSection('tasks')} 
        />
        <NavItem 
          icon={Calendar} 
          label="Calendar" 
          active={activeSection === 'calendar'} 
          onClick={() => setActiveSection('calendar')} 
        />
        <NavItem 
          icon={Clock} 
          label="Routines" 
          active={activeSection === 'routines'} 
          onClick={() => setActiveSection('routines')} 
        />
        <NavItem 
          icon={Settings} 
          label="Finance" 
          active={activeSection === 'finance'} 
          onClick={() => setActiveSection('finance')} 
        />
        <NavItem 
          icon={Clock} 
          label="Pomodoro" 
          active={activeSection === 'pomodoro'} 
          onClick={() => setActiveSection('pomodoro')} 
        />
        <NavItem 
          icon={Book} 
          label="Study" 
          active={activeSection === 'study'} 
          onClick={() => setActiveSection('study')} 
        />
      </nav>
    </div>
  )
}

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <div className={`nav-item ${active ? 'active' : ''}`} onClick={onClick} title={label}>
      <Icon size={24} />
      <span style={{ fontSize: '11px', marginTop: '4px' }}>{label}</span>
    </div>
  )
}

export default App