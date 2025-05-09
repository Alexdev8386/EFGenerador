import React from 'react';
import { calculatePasswordStrength } from '../utils/passwordUtils';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const { score, label, color } = calculatePasswordStrength(password);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm">Fortaleza:</span>
        <span className={`text-sm font-medium ${color}`}>{label}</span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${score * 25}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrength;