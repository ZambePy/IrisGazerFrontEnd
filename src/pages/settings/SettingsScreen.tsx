import React, { useState } from 'react';
import { BackButton } from '../../components/ui/BackButton';
import { Save, Download, Upload, MousePointer2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const SettingsScreen: React.FC = () => {
  const { settings, updateSettings: _updateSettings } = useSettings();
  const [virtualMouseActive, setVirtualMouseActive] = useState(false);

  const toggleVirtualMouse = () => {
    // Aqui no futuro chamaremos o WebSocket para o Python script ligar/desligar o mouse
    setVirtualMouseActive(!virtualMouseActive);
  };

  const handleBackup = () => {
    const data = JSON.stringify(settings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'irisflow_backup.json';
    a.click();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <BackButton />
        <h1 style={{ fontSize: '2rem', color: '#1e293b', margin: 0, fontWeight: 800 }}>Configurações</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Painel do Mouse Virtual */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
            <MousePointer2 color="#0891b2" /> Painel do Mouse Virtual
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Ativa a integração com o script Python local para dominar o cursor do Windows.
          </p>

          <button
            onClick={toggleVirtualMouse}
            style={{
              width: '100%', padding: '1.5rem', borderRadius: '1rem', border: 'none',
              background: virtualMouseActive ? '#ef4444' : '#0891b2',
              color: 'white', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer',
              boxShadow: virtualMouseActive ? '0 8px 20px rgba(239,68,68,0.3)' : '0 8px 20px rgba(8,145,178,0.3)'
            }}
          >
            {virtualMouseActive ? 'Desativar Mouse Virtual' : 'Ativar Mouse Virtual'}
          </button>
        </div>

        {/* Painel de Backup */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
            <Save color="#10b981" /> Backup e Restauração
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Exporte ou importe as configurações e o progresso local.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={handleBackup}
              style={{
                padding: '1.25rem', borderRadius: '1rem', border: 'none', background: '#f1f5f9',
                color: '#334155', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
              }}
            >
              <Download size={20} /> Exportar Backup (JSON)
            </button>
            <button
              style={{
                padding: '1.25rem', borderRadius: '1rem', border: 'none', background: '#f1f5f9',
                color: '#334155', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: 0.5
              }}
            >
              <Upload size={20} /> Importar (Em breve)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
