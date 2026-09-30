import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState(0)
  const [focusTime, setFocusTime] = useState(2)
  const [breakTime, setBreakTime] = useState(0.5)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            if (!isBreak) {
              setSessions(sessions + 1)
            }
            setIsBreak(!isBreak)
            return isBreak ? 25 * 60 : 5 * 60
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, isBreak, sessions])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const resetTimer = () => {
    setIsRunning(false)
    setIsBreak(false)
    setTimeLeft(25 * 60)
  }

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference * (1 - timeLeft / (isBreak ? 5 * 60 : 25 * 60))

  return (
    <div className="container">
      <h1 className="section-title">Pomodoro</h1>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button
          onClick={() => setIsBreak(false)}
          className="btn"
          style={{
            flex: 1,
            background: !isBreak ? '#7c3aed' : '#e5e7eb',
            color: !isBreak ? 'white' : '#333'
          }}
        >
          Focus
        </button>
        <button
          onClick={() => setIsBreak(true)}
          className="btn"
          style={{
            flex: 1,
            background: isBreak ? '#7c3aed' : '#e5e7eb',
            color: isBreak ? 'white' : '#333'
          }}
        >
          Break
        </button>
      </div>

      <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <svg width="180" height="180" style={{ marginBottom: '20px' }}>
          <circle cx="90" cy="90" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="90"
            cy="90"
            r="45"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '90px 90px', transition: 'stroke-dashoffset 0.5s linear' }}
          />
        </svg>
        <div style={{ fontSize: '14px', color: '#999', marginBottom: '8px' }}>
          {isBreak ? 'BREAK TIME' : 'FOCUS TIME'}
        </div>
        <div style={{ fontSize: '56px', fontWeight: '700', marginBottom: '8px' }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div style={{ fontSize: '14px', color: '#999' }}>Stay focused! ❤️</div>
        
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}>
          Session 1 of 4
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px' }}>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="btn btn-primary"
          style={{ borderRadius: '50%', width: '56px', height: '56px', padding: 0, justifyContent: 'center' }}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={resetTimer}
          className="btn btn-secondary"
          style={{ borderRadius: '50%', width: '56px', height: '56px', padding: 0, justifyContent: 'center' }}
        >
          <RotateCcw size={24} />
        </button>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Today's progress</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '12px' }}>
          <div>
            <div style={{ color: '#999' }}>Focus</div>
            <div style={{ fontWeight: '600', marginTop: '4px' }}>2h 30m</div>
          </div>
          <div>
            <div style={{ color: '#999' }}>Break</div>
            <div style={{ fontWeight: '600', marginTop: '4px' }}>30m</div>
          </div>
          <div>
            <div style={{ color: '#999' }}>Sessions</div>
            <div style={{ fontWeight: '600', marginTop: '4px' }}>3 / 4</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '12px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Settings</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px' }}>Focus time</span>
          <span style={{ fontWeight: '600' }}>25 min</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px' }}>Receso largo</span>
          <span style={{ fontWeight: '600' }}>5 min</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px' }}>Sessions</span>
          <span style={{ fontWeight: '600' }}>4 cycles</span>
        </div>
      </div>
    </div>
  )
}
