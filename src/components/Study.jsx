import { useState } from 'react'
import { Plus, Trash2, BookOpen } from 'lucide-react'

const SAMPLE_DOCUMENTS = [
  { id: 1, title: 'Mathematics - Chapter 5', subject: 'Mathematics', summary: 'Covers algebraic equations and polynomial functions...', uploadDate: '2024-04-15', difficulty: 'Medium' },
  { id: 2, title: 'Biology - Cell Structure', subject: 'Biology', summary: 'Understanding the components of eukaryotic and prokaryotic cells...', uploadDate: '2024-04-14', difficulty: 'Easy' },
  { id: 3, title: 'Chemistry - Reactions', subject: 'Chemistry', summary: 'Chemical reactions, types, and energy transformations...', uploadDate: '2024-04-13', difficulty: 'Hard' },
  { id: 4, title: 'History - World War II', subject: 'History', summary: 'Key events and impacts of WWII on global politics...', uploadDate: '2024-04-12', difficulty: 'Medium' }
]

const SAMPLE_FLASHCARDS = [
  { id: 1, front: 'What is the capital of France?', back: 'Paris', subject: 'Geography' },
  { id: 2, front: 'Define photosynthesis', back: 'Process by which plants convert light into chemical energy', subject: 'Biology' },
  { id: 3, front: 'What is H2O?', back: 'Water molecule composed of two hydrogen and one oxygen atom', subject: 'Chemistry' }
]

export default function Study() {
  const [documents, setDocuments] = useState(SAMPLE_DOCUMENTS)
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
  const [activeTab, setActiveTab] = useState('documents')
  const [showNewDocument, setShowNewDocument] = useState(false)
  const [newDocument, setNewDocument] = useState({ title: '', subject: '' })
  const [flippedCard, setFlippedCard] = useState(null)

  const addDocument = () => {
    if (newDocument.title && newDocument.subject) {
      setDocuments([...documents, {
        id: Date.now(),
        title: newDocument.title,
        subject: newDocument.subject,
        summary: 'Documento cargado recientemente...',
        uploadDate: new Date().toISOString().split('T')[0],
        difficulty: 'Medium'
      }])
      setNewDocument({ title: '', subject: '' })
      setShowNewDocument(false)
    }
  }

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id))
  }

  const deleteFlashcard = (id) => {
    setFlashcards(flashcards.filter(card => card.id !== id))
  }

  return (
    <div className="container">
      <h1 className="section-title">Estudio</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('documents')}
          className="btn"
          style={{
            flex: 1,
            background: activeTab === 'documents' ? '#7c3aed' : '#e5e7eb',
            color: activeTab === 'documents' ? 'white' : '#333'
          }}
        >
          Documentos
        </button>
        <button
          onClick={() => setActiveTab('flashcards')}
          className="btn"
          style={{
            flex: 1,
            background: activeTab === 'flashcards' ? '#7c3aed' : '#e5e7eb',
            color: activeTab === 'flashcards' ? 'white' : '#333'
          }}
        >
          Flashcards
        </button>
      </div>

      {activeTab === 'documents' && (
        <>
          {!showNewDocument && (
            <button onClick={() => setShowNewDocument(true)} className="btn btn-primary" style={{ width: '100%', marginBottom: '20px' }}>
              <Plus size={20} /> Agregar documento
            </button>
          )}
          {showNewDocument && (
            <div className="card" style={{ marginBottom: '20px' }}>
              <input
                type="text"
                value={newDocument.title}
                onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                placeholder="Título del documento"
                style={{ marginBottom: '10px' }}
              />
              <input
                type="text"
                value={newDocument.subject}
                onChange={(e) => setNewDocument({ ...newDocument, subject: e.target.value })}
                placeholder="Materia"
                style={{ marginBottom: '10px' }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={addDocument} className="btn btn-primary" style={{ flex: 1 }}>Subir</button>
                <button onClick={() => setShowNewDocument(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancelar</button>
              </div>
            </div>
          )}
          {documents.map(doc => (
            <div key={doc.id} className="card" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <BookOpen size={24} color="#7c3aed" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{doc.title}</div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                    {doc.subject} • {doc.uploadDate}
                  </div>
                  <div style={{ fontSize: '12px', color: '#999', lineHeight: '1.4' }}>
                    {doc.summary}
                  </div>
                  <div style={{ fontSize: '10px', marginTop: '8px' }}>
                    <span style={{
                      display: 'inline-block',
                      background: doc.difficulty === 'Easy' ? '#d1fae5' : doc.difficulty === 'Medium' ? '#fef3c7' : '#fee2e2',
                      color: doc.difficulty === 'Easy' ? '#065f46' : doc.difficulty === 'Medium' ? '#92400e' : '#991b1b',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      {doc.difficulty}
                    </span>
                  </div>
                </div>
                <button onClick={() => deleteDocument(doc.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0, flexShrink: 0 }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {activeTab === 'flashcards' && (
        <>
          <button className="btn btn-primary" style={{ width: '100%', marginBottom: '20px' }}>
            <Plus size={20} /> Crear flashcard
          </button>
          {flashcards.map(card => (
            <div
              key={card.id}
              onClick={() => setFlippedCard(flippedCard === card.id ? null : card.id)}
              className="card"
              style={{
                marginBottom: '12px',
                cursor: 'pointer',
                background: flippedCard === card.id ? '#7c3aed' : '#f5f5f5',
                color: flippedCard === card.id ? 'white' : '#333',
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                padding: '20px',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '8px' }}>
                  {flippedCard === card.id ? 'Respuesta' : 'Pregunta'}
                </div>
                <div style={{ fontSize: '16px', fontWeight: '500' }}>
                  {flippedCard === card.id ? card.back : card.front}
                </div>
                <div style={{ fontSize: '10px', marginTop: '12px', opacity: 0.6 }}>
                  {card.subject}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteFlashcard(card.id)
                }}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: flippedCard === card.id ? 'white' : '#999',
                  padding: 0
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  )
}