import React, { useState } from 'react';
import { BackButton } from '../../components/ui/BackButton';
import { CheckCircle2, Circle, Activity, Frown, Smile, HeartPulse } from 'lucide-react';

export const CaregiverDashboard: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Tomar medicação da manhã', done: true },
    { id: 2, label: 'Fisioterapia (14h)', done: false },
    { id: 3, label: 'Beber 500ml de água', done: false },
  ]);

  const [painLevel, setPainLevel] = useState(0);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <BackButton />
        <h1 style={{ fontSize: '2rem', color: '#1e293b', margin: 0, fontWeight: 800 }}>
          Painel do Cuidador
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Lista de Tarefas */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', marginTop: 0 }}>
            <Activity color="#2563eb" /> Rotina Diária
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {tasks.map(task => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1.5rem', borderRadius: '1rem', border: 'none',
                  background: task.done ? '#f0fdf4' : '#f1f5f9',
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: task.done ? 'inset 0 0 0 2px #22c55e' : 'none'
                }}
              >
                {task.done ? <CheckCircle2 size={32} color="#22c55e" /> : <Circle size={32} color="#94a3b8" />}
                <span style={{ fontSize: '1.25rem', fontWeight: 600, color: task.done ? '#166534' : '#475569', textDecoration: task.done ? 'line-through' : 'none' }}>
                  {task.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Diário de Sintomas */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', marginTop: 0 }}>
            <HeartPulse color="#ef4444" /> Registro de Sintomas
          </h2>
          
          <div style={{ marginTop: '2rem' }}>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#475569' }}>Nível de Dor Atual: {painLevel}</p>
            <input 
              type="range" 
              min="0" max="10" 
              value={painLevel} 
              onChange={(e) => setPainLevel(parseInt(e.target.value))}
              style={{ width: '100%', height: '20px', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', color: '#94a3b8' }}>
              <span>0 (Sem dor)</span>
              <span>10 (Dor máxima)</span>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#475569', marginBottom: '1rem' }}>Humor / Bem-Estar</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ flex: 1, padding: '2rem', background: '#fef2f2', border: 'none', borderRadius: '1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <Frown size={48} color="#ef4444" />
                <span style={{ fontWeight: 'bold', color: '#b91c1c' }}>Mal</span>
              </button>
              <button style={{ flex: 1, padding: '2rem', background: '#f0fdf4', border: 'none', borderRadius: '1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <Smile size={48} color="#22c55e" />
                <span style={{ fontWeight: 'bold', color: '#15803d' }}>Bem</span>
              </button>
            </div>
          </div>

          <button style={{
            width: '100%', padding: '1.5rem', marginTop: '2rem', background: '#1B54A8', color: 'white',
            border: 'none', borderRadius: '1rem', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(27,84,168,0.3)'
          }}>
            Salvar Diário
          </button>
        </div>
      </div>
    </div>
  );
};
