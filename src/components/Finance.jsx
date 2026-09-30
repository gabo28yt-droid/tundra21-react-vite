import { useState } from 'react'
import { Plus, TrendingUp, TrendingDown } from 'lucide-react'

const EXPENSE_CATEGORIES = [
  { name: 'Salary', amount: 5000, color: '#4f46e5', icon: '💰' },
  { name: 'Medicine', amount: 2680, color: '#ef4444', icon: '💊' },
  { name: 'Restaurant', amount: 2680, color: '#f97316', icon: '🍽️' },
  { name: 'Cloth', amount: 2680, color: '#a855f7', icon: '👗' },
  { name: 'Fuel', amount: 0, color: '#06b6d4', icon: '⛽' }
]

export default function Finance() {
  const [expenses, setExpenses] = useState(EXPENSE_CATEGORIES)
  const [view, setView] = useState('expense')
  const [newExpense, setNewExpense] = useState({ category: 'Salary', amount: '' })

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const totalIncome = 20000
  const balance = totalIncome - totalExpenses

  const addExpense = () => {
    if (newExpense.amount) {
      setExpenses([...expenses.map(e => e.name === newExpense.category ? { ...e, amount: e.amount + parseFloat(newExpense.amount) } : e)])
      setNewExpense({ category: 'Salary', amount: '' })
    }
  }

  return (
    <div className="container">
      <h1 className="section-title">Finanzas</h1>

      <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', marginBottom: '20px' }}>
        <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Balance</div>
        <div style={{ fontSize: '32px', fontWeight: '700', marginTop: '8px' }}>${balance.toLocaleString()}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '14px' }}>
          <div>
            <div style={{ opacity: 0.9 }}>Income</div>
            <div style={{ fontWeight: '600', marginTop: '4px' }}>${totalIncome.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ opacity: 0.9 }}>Expenses</div>
            <div style={{ fontWeight: '600', marginTop: '4px' }}>${totalExpenses.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => setView('expense')}
          className="btn"
          style={{
            flex: 1,
            background: view === 'expense' ? '#7c3aed' : '#e5e7eb',
            color: view === 'expense' ? 'white' : '#333'
          }}
        >
          Expense
        </button>
        <button
          onClick={() => setView('income')}
          className="btn"
          style={{
            flex: 1,
            background: view === 'income' ? '#7c3aed' : '#e5e7eb',
            color: view === 'income' ? 'white' : '#333'
          }}
        >
          Income
        </button>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <select
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e0e0e0' }}
          >
            {expenses.map(e => <option key={e.name} value={e.name}>{e.name}</option>)}
          </select>
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            placeholder="Amount"
            style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e0e0e0' }}
          />
        </div>
        <button onClick={addExpense} className="btn btn-primary" style={{ width: '100%' }}>
          <Plus size={20} /> Add {view === 'expense' ? 'Expense' : 'Income'}
        </button>
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Categorías</h3>
      {expenses.map(exp => (
        <div key={exp.name} className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: exp.color,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            {exp.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '600' }}>{exp.name}</div>
          </div>
          <div style={{ fontWeight: '600', color: '#7c3aed' }}>${exp.amount.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}
