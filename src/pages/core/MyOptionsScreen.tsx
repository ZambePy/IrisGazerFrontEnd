import React from 'react';
import { Phone, Heart, Plus, Users } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { BackButton } from '../../components/ui/BackButton';

export const MyOptionsScreen: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '2rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <BackButton />
        <h1 style={{ fontSize: '2rem', color: '#1e293b', margin: 0, fontWeight: 800 }}>Minhas Opções</h1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Card 
          icon={<Heart size={40} color="white" />}
          label="Favoritos"
          sublabel="Frases e atalhos preferidos"
          color="#e11d48"
          onClick={() => {}}
        />
        <Card 
          icon={<Users size={40} color="white" />}
          label="Contatos"
          sublabel="Agenda rápida"
          color="#059669"
          onClick={() => {}}
        />
        <Card 
          icon={<Phone size={40} color="white" />}
          label="Chamadas"
          sublabel="Videochamadas recentes"
          color="#3b82f6"
          onClick={() => {}}
        />
        <Card 
          icon={<Plus size={40} color="white" />}
          label="Adicionar Novo"
          sublabel="Configurar opção"
          color="#64748b"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
