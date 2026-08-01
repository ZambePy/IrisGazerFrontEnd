export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api',
  wsUrl: import.meta.env.VITE_WS_URL ?? 'ws://localhost:8000/ws/tracker',
  caregiverPin: import.meta.env.VITE_CAREGIVER_PIN ?? '1234',
} as const;
