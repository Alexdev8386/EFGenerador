import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import PasswordOptions from './PasswordOptions';
import PasswordStrength from './PasswordStrength';
import PasswordHistory from './PasswordHistory';
import { generatePassword } from '../utils/passwordUtils';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [passwordHistory, setPasswordHistory] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    handleGeneratePassword();
  }, []);

  const handleGeneratePassword = (): void => {
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
      return; 
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const newPassword = generatePassword(
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols
      );
      
      setPassword(newPassword);
 
      setPasswordHistory(prevHistory => {
        const newHistory = [newPassword, ...prevHistory];
        return newHistory.slice(0, 5);
      });
      
      setIsGenerating(false);
    }, 300);
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Error al copiar: ', err);
      });
  };

  return (
    <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-xl">
      {/* Visualización de la contraseña */}
      <div className="mb-6 relative">
        <div className={`p-4 bg-gray-700 rounded-lg flex justify-between items-center border border-gray-600 transition-all ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
          <p className="font-mono text-xl break-all select-all">{password}</p>
          <button 
            onClick={copyToClipboard}
            className="p-2 ml-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
            title="Copiar al portapapeles"
            disabled={isGenerating}
          >
            <Copy size={20} />
          </button>
        </div>
        {copySuccess && (
          <div className="absolute right-0 top-full mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded animate-fade-in-out">
            ¡Copiado!
          </div>
        )}
      </div>

      {/* Indicador de fortaleza */}
      <PasswordStrength password={password} />
      
      {/* Opciones de contraseña */}
      <PasswordOptions 
        length={length}
        setLength={setLength}
        includeUppercase={includeUppercase}
        setIncludeUppercase={setIncludeUppercase}
        includeLowercase={includeLowercase}
        setIncludeLowercase={setIncludeLowercase}
        includeNumbers={includeNumbers}
        setIncludeNumbers={setIncludeNumbers}
        includeSymbols={includeSymbols}
        setIncludeSymbols={setIncludeSymbols}
      />
      
      {/* Botón de generar */}
      <button 
        onClick={handleGeneratePassword}
        className={`w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md flex items-center justify-center mt-6 transition-colors ${isGenerating ? 'opacity-75' : ''}`}
        disabled={isGenerating || (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols)}
      >
        <RefreshCw size={20} className={`mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
        Generar Nueva Contraseña
      </button>
      
      {/* Historial de contraseñas */}
      {passwordHistory.length > 1 && (
        <PasswordHistory 
          history={passwordHistory.slice(1)} 
          onSelectPassword={(pwd) => setPassword(pwd)}
        />
      )}
    </div>
  );
};

export default PasswordGenerator;