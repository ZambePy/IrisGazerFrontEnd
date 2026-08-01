const API_BASE = 'http://localhost:8000/api';

export const api = {
  // Voz
  cloneVoice: (audioFile: File, userId: string) => {
    const form = new FormData();
    form.append('file', audioFile);
    form.append('user_id', userId);
    return fetch(`${API_BASE}/voice/clone`, { method: 'POST', body: form });
  },
  
  voiceStatus: (taskId: string) => 
    fetch(`${API_BASE}/voice/status/${taskId}`),
  
  synthesize: (text: string, voiceProfileId?: string) =>
    fetch(`${API_BASE}/voice/synthesize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice_profile_id: voiceProfileId }),
    }),
  
  // Alertas
  sendHelpAlert: (userId: string) =>
    fetch(`${API_BASE}/alerts/help`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, timestamp: new Date().toISOString(), priority: 'high' }),
    }),
  
  // Casa inteligente
  smartHomeAction: (device: string, action: string) =>
    fetch(`${API_BASE}/smart-home/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device, action }),
    }),
};
