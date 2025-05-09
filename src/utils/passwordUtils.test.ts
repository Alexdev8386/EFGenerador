import { generatePassword, calculatePasswordStrength, shuffleString } from './passwordUtils';

describe('Utilidades de generación de contraseñas', () => {
  // Prueba generatePassword
  describe('generatePassword', () => {
    test('genera una contraseña con la longitud especificada', () => {
      const password = generatePassword(10, true, true, true, true);
      expect(password.length).toBe(10);
    });
    
    test('incluye solo letras minúsculas cuando se especifica', () => {
      const password = generatePassword(10, false, true, false, false);
      expect(password).toMatch(/^[a-z]+$/);
    });
    
    test('incluye solo letras mayúsculas cuando se especifica', () => {
      const password = generatePassword(10, true, false, false, false);
      expect(password).toMatch(/^[A-Z]+$/);
    });
    
    test('incluye solo números cuando se especifica', () => {
      const password = generatePassword(10, false, false, true, false);
      expect(password).toMatch(/^[0-9]+$/);
    });
    
    test('incluye caracteres de todos los tipos especificados', () => {
      const password = generatePassword(12, true, true, true, true);
      expect(password).toMatch(/[A-Z]/);
      expect(password).toMatch(/[a-z]/);
      expect(password).toMatch(/[0-9]/);
      expect(password).toMatch(/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/);
    });
  });
  
  // Prueba calculatePasswordStrength
  describe('calculatePasswordStrength', () => {
    test('devuelve 0 para una contraseña vacía', () => {
      const result = calculatePasswordStrength('');
      expect(result.score).toBe(0);
    });
    
    test('clasifica correctamente una contraseña débil', () => {
      const result = calculatePasswordStrength('abc123');
      expect(result.score).toBeLessThan(3);
    });
    
    test('clasifica correctamente una contraseña fuerte', () => {
      const result = calculatePasswordStrength('Abc123!@#XYZ789');
      expect(result.score).toBeGreaterThanOrEqual(3);
    });
    
    test('retorna una etiqueta de texto para cada puntuación', () => {
      const result = calculatePasswordStrength('Abc123!@#');
      expect(result.label).toBeTruthy();
    });
  });
  
  // Prueba shuffleString
  describe('shuffleString', () => {
    test('mantiene los mismos caracteres después de mezclar', () => {
      const original = 'ABCDEF';
      const shuffled = shuffleString(original);
      
      // Ordenar ambas para comparar
      const sortedOriginal = original.split('').sort().join('');
      const sortedShuffled = shuffled.split('').sort().join('');
      
      expect(sortedShuffled).toEqual(sortedOriginal);
    });
    
    test('mantiene la misma longitud después de mezclar', () => {
      const original = 'ABCDEF';
      const shuffled = shuffleString(original);
      expect(shuffled.length).toEqual(original.length);
    });
  });
});