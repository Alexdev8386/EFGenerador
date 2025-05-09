export const generatePassword = (
  length: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
): string => {

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let chars = '';
  if (includeUppercase) chars += uppercaseChars;
  if (includeLowercase) chars += lowercaseChars;
  if (includeNumbers) chars += numberChars;
  if (includeSymbols) chars += symbolChars;

  if (!chars) chars = lowercaseChars;

  let password = '';

  const getRandomChar = (charSet: string): string => {
    return charSet.charAt(Math.floor(Math.random() * charSet.length));
  };

  if (includeUppercase) password += getRandomChar(uppercaseChars);
  if (includeLowercase) password += getRandomChar(lowercaseChars);
  if (includeNumbers) password += getRandomChar(numberChars);
  if (includeSymbols) password += getRandomChar(symbolChars);

  while (password.length < length) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return shuffleString(password).slice(0, length);
};


export const shuffleString = (str: string): string => {
  const array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
};


export const calculatePasswordStrength = (password: string): { score: number; label: string; color: string } => {
  if (!password) {
    return { score: 0, label: 'Sin contraseña', color: 'text-gray-500' };
  }

  let score = 0;

  if (password.length >= 15) {
    score += 3;
  } else if (password.length >= 11) {
    score += 2;
  } else if (password.length >= 7) {
    score += 1;
  }

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  const varietyScore = (hasLowercase ? 1 : 0) + 
                        (hasUppercase ? 1 : 0) + 
                        (hasNumbers ? 1 : 0) + 
                        (hasSymbols ? 1 : 0);
  
  score += varietyScore > 3 ? 2 : varietyScore > 1 ? 1 : 0;

  score = Math.min(4, score);

  let label, color;
  switch (score) {
    case 0:
      label = 'Muy débil';
      color = 'text-red-500 bg-red-500/30';
      break;
    case 1:
      label = 'Débil';
      color = 'text-orange-500 bg-orange-500/30';
      break;
    case 2:
      label = 'Media';
      color = 'text-yellow-500 bg-yellow-500/30';
      break;
    case 3:
      label = 'Fuerte';
      color = 'text-green-500 bg-green-500/30';
      break;
    case 4:
      label = 'Muy fuerte';
      color = 'text-emerald-400 bg-emerald-500/30';
      break;
    default:
      label = 'Desconocida';
      color = 'text-gray-500 bg-gray-500/30';
  }
  
  return { score, label, color };
};