import React, { createContext, useContext, useState } from 'react';

export interface Profile {
  id: string;
  name: string;
  avatar?: string;
}

interface AuthContextData {
  currentProfile: Profile | null;
  profiles: Profile[]; // lista mock
  isCaregiver: boolean;
  selectProfile: (p: Profile) => void;
  loginCaregiver: (pin: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [isCaregiver, setIsCaregiver] = useState(false);

  // Perfis mockados para desenvolvimento (sem DB)
  const mockProfiles: Profile[] = [
    { id: 'p1', name: 'Paciente A', avatar: 'https://ui-avatars.com/api/?name=Paciente+A&background=1B54A8&color=fff' },
    { id: 'p2', name: 'Paciente B', avatar: 'https://ui-avatars.com/api/?name=Paciente+B&background=6D28D9&color=fff' },
    { id: 'p3', name: 'Paciente C', avatar: 'https://ui-avatars.com/api/?name=Paciente+C&background=059669&color=fff' },
  ];

  const selectProfile = (p: Profile) => setCurrentProfile(p);

  const loginCaregiver = (pin: string) => {
    // TODO: validar pin via backend
    if (pin === '1234') {
      setIsCaregiver(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentProfile(null);
    setIsCaregiver(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentProfile,
        profiles: mockProfiles,
        isCaregiver,
        selectProfile,
        loginCaregiver,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
