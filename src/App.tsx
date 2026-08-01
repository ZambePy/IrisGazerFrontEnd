import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WebSocketProvider } from './context/WebSocketContext';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';

import { MainMenu } from './pages/MainMenu';
import { WelcomeScreen } from './pages/WelcomeScreen';
import { KeyboardScreen } from './pages/KeyboardScreen';
import { QuickPhrasesScreen } from './pages/QuickPhrasesScreen';
import { SettingsScreen } from './pages/SettingsScreen';
import { GamesMenu } from './pages/GamesMenu';
import { BubblePopGame } from './pages/BubblePopGame';

import { InitialSplash } from './pages/onboarding/InitialSplash';
import { LoginScreen } from './pages/auth/LoginScreen';
import { TutorialScreen } from './pages/help/TutorialScreen';
import { ProfileSelect } from './pages/auth/ProfileSelect';
import { CalibrationCheck } from './pages/onboarding/CalibrationCheck';
import { ChatbotScreen } from './pages/ai/ChatbotScreen';
import { FollowTarget } from './pages/games/FollowTarget';
import { MemoryGame } from './pages/games/MemoryGame';
import { DrawingGame } from './pages/games/DrawingGame';
import { MyOptionsScreen } from './pages/core/MyOptionsScreen';
import { PictogramScreen } from './pages/core/PictogramScreen';
import { EmergencyEscalation } from './pages/output/EmergencyEscalation';
import { GalleryScreen } from './pages/entertainment/GalleryScreen';
import { NewsScreen } from './pages/entertainment/NewsScreen';
import { CaregiverDashboard } from './pages/caregiver/CaregiverDashboard';
import { MeditationScreen } from './pages/health/MeditationScreen';
import { IAmOkScreen } from './pages/caregiver/IAmOkScreen';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <WebSocketProvider>
          <BrowserRouter>
            <Routes>
              {/* Onboarding */}
              <Route path="/" element={<InitialSplash />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/tutorial" element={<TutorialScreen />} />
              <Route path="/profiles" element={<ProfileSelect />} />
              <Route path="/calibration-check" element={<CalibrationCheck />} />
              <Route path="/welcome" element={<WelcomeScreen />} />
              
              {/* Menu Principal */}
              <Route path="/menu" element={<MainMenu />} />
              
              {/* Comunicação */}
              <Route path="/keyboard" element={<KeyboardScreen />} />
              <Route path="/phrases" element={<QuickPhrasesScreen />} />
              <Route path="/pictograms" element={<PictogramScreen />} />
              <Route path="/chatbot" element={<ChatbotScreen />} />
              <Route path="/emergency" element={<EmergencyEscalation />} />
              <Route path="/options" element={<MyOptionsScreen />} />
              
              {/* Saúde e Cuidador */}
              <Route path="/caregiver" element={<CaregiverDashboard />} />
              <Route path="/meditation" element={<MeditationScreen />} />
              <Route path="/iamok" element={<IAmOkScreen />} />

              {/* Lazer */}
              <Route path="/games" element={<GamesMenu />} />
              <Route path="/games/bubble" element={<BubblePopGame />} />
              <Route path="/games/follow" element={<FollowTarget />} />
              <Route path="/games/memory" element={<MemoryGame />} />
              <Route path="/drawing" element={<DrawingGame />} />
              <Route path="/gallery" element={<GalleryScreen />} />
              <Route path="/news" element={<NewsScreen />} />

              {/* Sistema */}
              <Route path="/settings" element={<SettingsScreen />} />
            </Routes>
          </BrowserRouter>
        </WebSocketProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
