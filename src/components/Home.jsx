import { CheckSquare, Calendar, Clock, Settings, BookOpen, Zap } from 'lucide-react'

const features = [
  { icon: CheckSquare, title: 'Tareas', description: 'Organiza tus tareas por prioridad y categoría' },
  { icon: Calendar, title: 'Calendario', description: 'Gestiona tu horario y eventos' },
  { icon: Clock, title: 'Rutinas', description: 'Establece y sigue tus rutinas diarias' },
  { icon: Settings, title: 'Finanzas', description: 'Controla tus ingresos y gastos' },
  { icon: Zap, title: 'Pomodoro', description: 'Mejora tu productividad con técnica Pomodoro' },
  { icon: BookOpen, title: 'Estudio', description: 'Gestiona documentos y flashcards' }
]

export default function Home() {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px', color: '#333' }}>Tundra21</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>Tu app de productividad personal</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '40px' }}>
        {features.map((feature, idx) => {
          const Icon = feature.icon
          return (
            <div key={idx} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: '#ede9fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={20} color="#7c3aed" />
              </div>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{feature.title}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{feature.description}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center', padding: '32px 20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>¡Comienza ahora!</h2>
        <p style={{ fontSize: '14px', marginBottom: '16px', opacity: 0.9 }}>Organiza tu vida y aumenta tu productividad</p>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>Selecciona una sección en el menú inferior</div>
      </div>
    </div>
  )
}