import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

const PRIORITY_LEVELS = {
  Alta: { color: '#ff6b6b', bg: '#ffe0e0' },
  Media: { color: '#ffa500', bg: '#fff3e0' },
  Baja: { color: '#4ecdc4', bg: '#e0f7f6' }
}

const TASK_CATEGORIES = [
  { name: 'Materias', color: '#ff6b6b' },
  { name: 'Quehaceres', color: '#4ecdc4' },
  { name: 'Reuniones', color: '#95e1d3' },
  { name: 'Actividades', color: '#f38181' },
  { name: 'Otro', color: '#aa96da' }
]

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Study for the test', priority: 'Alta', category: 'Materias', completed: false, date: 'Today' },
    { id: 2, title: 'Finish chemistry homework', priority: 'Alta', category: 'Materias', completed: false, date: 'Today' },
    { id: 3, title: 'Read chapter 4', priority: 'Media', category: 'Materias', completed: false, date: 'Tomorrow' },
    { id: 4, title: 'History summary', priority: 'Media', category: 'Materias', completed: false, date: 'Tomorrow' },
    { id: 5, title: 'Organize notes', priority: 'Baja', category: 'Quehaceres', completed: false, date: 'Saturday' }
  ])
  const [newTask, setNewTask] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('Media')
  const [selectedCategory, setSelectedCategory] = useState('Materias')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask,
        priority: selectedPriority,
        category: selectedCategory,
        completed: false,
        date: 'Today'
      }])
      setNewTask('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const groupedTasks = Object.groupBy(tasks, task => task.priority)

  return (
    <div className="container">
      <h1 className="section-title">Tareas</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea..."
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            marginBottom: '10px',
            fontSize: '14px'
          }}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)}
            style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            {Object.keys(PRIORITY_LEVELS).map(p => <option key={p} value={p}>{p} prioridad</option>)}
          </select>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            {TASK_CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        <button onClick={addTask} className="btn btn-primary" style={{ width: '100%' }}>
          <Plus size={20} /> Agregar tarea
        </button>
      </div>

      {(['Alta', 'Media', 'Baja']).map(priority => (
        <div key={priority}>
          <h3 style={{ color: PRIORITY_LEVELS[priority].color, marginTop: '16px', marginBottom: '12px', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>
            {priority} prioridad
          </h3>
          {(groupedTasks[priority] || []).map(task => (
            <div key={task.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#999' : '#333',
                  fontWeight: '500'
                }}>
                  {task.title}
                </div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                  {task.category} • {task.date}
                </div>
              </div>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: TASK_CATEGORIES.find(c => c.name === task.category)?.color
              }} />
              <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
