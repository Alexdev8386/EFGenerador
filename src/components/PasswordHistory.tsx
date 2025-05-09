import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

interface PasswordHistoryProps {
  history: string[];
  onSelectPassword: (password: string) => void;
}

const PasswordHistory: React.FC<PasswordHistoryProps> = ({ history, onSelectPassword }) => {
  if (history.length === 0) return null;
  
  return (
    <div className="mt-6 pt-4 border-t border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <Clock size={16} className="text-gray-400" />
        <h3 className="text-sm font-medium text-gray-300">Contraseñas recientes</h3>
      </div>
      <ul className="space-y-2">
        {history.map((pwd, index) => (
          <li key={index} className="text-sm">
            <button 
              onClick={() => onSelectPassword(pwd)}
              className="group flex items-center w-full p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            >
              <span className="font-mono truncate flex-1 text-left">{pwd}</span>
              <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordHistory;