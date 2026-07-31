import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WebSocketProvider } from './context/WebSocketContext';
import { MainMenu } from './pages/MainMenu';
import { WelcomeScreen } from './pages/WelcomeScreen';
import { KeyboardScreen } from './pages/KeyboardScreen';
import { QuickPhrasesScreen } from './pages/QuickPhrasesScreen';
import { SettingsScreen } from './pages/SettingsScreen';
import { GamesMenu } from './pages/GamesMenu';
import { BubblePopGame } from './pages/BubblePopGame';

function App() {
  return (
    <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/menu" element={<MainMenu />} />
          <Route path="/keyboard" element={<KeyboardScreen />} />
          <Route path="/phrases" element={<QuickPhrasesScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/games" element={<GamesMenu />} />
          <Route path="/games/bubble" element={<BubblePopGame />} />
          <Route path="/options" element={<div className="p-8 text-2xl">Minhas Opções - Em breve</div>} />
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
