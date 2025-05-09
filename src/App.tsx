import React from 'react';
import { Shield as ShieldLock } from 'lucide-react';
import PasswordGenerator from './components/PasswordGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center">
      <header className="w-full py-6 px-4 flex justify-center items-center bg-gray-800 shadow-md">
        <div className="flex items-center gap-2">
          <ShieldLock className="h-8 w-8 text-purple-500" />
          <h1 className="text-2xl font-bold">Generador de Contraseñas</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
        <PasswordGenerator />
      </main>
      
      <footer className="w-full py-4 bg-gray-800 text-center text-sm text-gray-400">
        <p>© 2025 Generador de Contraseñas Seguras</p>
      </footer>
    </div>
  );
}

export default App;