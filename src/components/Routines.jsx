import { useState } from 'react'
import { CheckCircle2, Clock } from 'lucide-react'

const ROUTINE_ACTIVITIES = [
  { id: 1, title: 'Rise and Shine', time: '5:45 AM', duration: null, icon: '☀️', completed: false },
  { id: 2, title: 'Bible before phone', time: '5:50 - 6:20 AM', duration: '30 mins', icon: '✝️', completed: false },
  { id: 3, title: 'Workout', time: '6:20 - 6:35 AM', duration: '15 mins', icon: '💪', completed: false },
  { id: 4, title: 'Clean room', time: '6:35 - 6:50 AM', duration: '15 mins', icon: '🛏️', completed: false },
  { id: 5, title: 'Take a shower', time: '7:05 - 7:35 AM', duration: '30 mins', icon: '🚿', completed: false },
  { id: 6, title: 'Eat breakfast', time: '7:45 - 8:00 AM', duration: '15 mins', icon: '🍽️', completed: false },
  { id: 7, title: 'School', time: '9:00 - 9:15 AM', duration: null, icon: '🎓', completed: false }
]

export default function Routines() {
  const [activities, setActivities] = useState(ROUTINE_ACTIVITIES)
  const [selectedDay, setSelectedDay] = useState('Monday')

  const toggleActivity = (id) => {
    setActivities(activities.map(a => a.id === id ? { ...a, completed: !a.completed } : a))
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="container">
      <h1 className="section-title">Rutinas</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '20px' }}>
        {days.map(day => (
          <div
            key={day}
            onClick={() => setSelectedDay(day)}
            style={{
              padding: '12px 8px',
              textAlign: 'center',
              borderRadius: '8px',
              background: day === selectedDay ? '#7c3aed' : '#f5f5f5',
              color: day === selectedDay ? 'white' : '#333',
              fontWeight: day === selectedDay ? '600' : '400',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {day}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        {activities.map(activity => (
          <div key={activity.id} className="card" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <button
              onClick={() => toggleActivity(activity.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: '24px'
              }}
            >
              <CheckCircle2 size={24} color={activity.completed ? '#7c3aed' : '#ddd'} />
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', textDecoration: activity.completed ? 'line-through' : 'none' }}>
                {activity.icon} {activity.title}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {activity.time}
              </div>
              {activity.duration && (
                <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                  <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  {activity.duration}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ background: '#f0f4ff', borderLeft: '4px solid #7c3aed', marginTop: '20px' }}>
        <div style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '600' }}>Flexible routine</div>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Puedes cambiar actividades para este día sin afectar otras semanas</div>
      </div>
    </div>
  )
}
