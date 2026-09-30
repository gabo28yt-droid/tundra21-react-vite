import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const EVENTS = [
  { id: 1, title: 'Math Class', time: '8:00 - 9:30 AM', day: 21, color: '#ff9999' },
  { id: 2, title: 'Chemistry', time: '10:00 - 11:30 AM', day: 21, color: '#c8b6f6' },
  { id: 3, title: 'Lunch Break', time: '12:00 - 1:00 PM', day: 21, color: '#99e8d9' },
  { id: 4, title: 'Study Time', time: '2:00 - 3:30 PM', day: 21, color: '#fff099' }
]

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 3, 21))
  const [selectedDay, setSelectedDay] = useState(21)

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const days = []
  const firstDay = getFirstDayOfMonth(currentDate)
  const daysInMonth = getDaysInMonth(currentDate)

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const dayEvents = EVENTS.filter(e => e.day === selectedDay)

  return (
    <div className="container">
      <h1 className="section-title">Calendario</h1>

      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <ChevronLeft size={24} />
          </button>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '20px' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#999', padding: '8px' }}>
              {day}
            </div>
          ))}
          {days.map((day, idx) => (
            <div
              key={idx}
              onClick={() => day && setSelectedDay(day)}
              style={{
                padding: '12px 8px',
                textAlign: 'center',
                borderRadius: '8px',
                cursor: day ? 'pointer' : 'default',
                background: day === selectedDay ? '#7c3aed' : '#f5f5f5',
                color: day === selectedDay ? 'white' : '#333',
                fontWeight: day === selectedDay ? '600' : '400',
                fontSize: '14px'
              }}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Eventos del {selectedDay}</h3>
      {dayEvents.map(event => (
        <div key={event.id} className="card" style={{ borderLeft: `4px solid ${event.color}` }}>
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>{event.title}</div>
          <div style={{ fontSize: '14px', color: '#666' }}>{event.time}</div>
        </div>
      ))}
      {dayEvents.length === 0 && (
        <div className="card" style={{ color: '#999', textAlign: 'center', padding: '24px' }}>
          No hay eventos para este día
        </div>
      )}
    </div>
  )
}