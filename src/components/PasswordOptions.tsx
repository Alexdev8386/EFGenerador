import React from 'react';

interface PasswordOptionsProps {
  length: number;
  setLength: (length: number) => void;
  includeUppercase: boolean;
  setIncludeUppercase: (include: boolean) => void;
  includeLowercase: boolean;
  setIncludeLowercase: (include: boolean) => void;
  includeNumbers: boolean;
  setIncludeNumbers: (include: boolean) => void;
  includeSymbols: boolean;
  setIncludeSymbols: (include: boolean) => void;
}

const PasswordOptions: React.FC<PasswordOptionsProps> = ({
  length,
  setLength,
  includeUppercase,
  setIncludeUppercase,
  includeLowercase,
  setIncludeLowercase,
  includeNumbers,
  setIncludeNumbers,
  includeSymbols,
  setIncludeSymbols
}) => {
  return (
    <div className="space-y-4">
      {/* Control de longitud */}
      <div>
        <div className="flex justify-between mb-1">
          <label htmlFor="length" className="text-sm font-medium">
            Longitud: {length} caracteres
          </label>
        </div>
        <input
          type="range"
          id="length"
          min={4}
          max={32}
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>4</span>
          <span>32</span>
        </div>
      </div>

      {/* Opciones de caracteres */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-medium mb-2">Incluir caracteres:</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeLowercase"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
            disabled={!includeUppercase && !includeNumbers && !includeSymbols}
          />
          <label htmlFor="includeLowercase" className="ml-2 text-sm">
            Letras minúsculas (a-z)
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeUppercase"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
            disabled={!includeLowercase && !includeNumbers && !includeSymbols}
          />
          <label htmlFor="includeUppercase" className="ml-2 text-sm">
            Letras mayúsculas (A-Z)
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeNumbers"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
            disabled={!includeLowercase && !includeUppercase && !includeSymbols}
          />
          <label htmlFor="includeNumbers" className="ml-2 text-sm">
            Números (0-9)
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeSymbols"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
            disabled={!includeLowercase && !includeUppercase && !includeNumbers}
          />
          <label htmlFor="includeSymbols" className="ml-2 text-sm">
            Símbolos especiales (@#$%&*)
          </label>
        </div>
      </div>
    </div>
  );
};

export default PasswordOptions;