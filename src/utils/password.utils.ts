import { ValidationArguments } from 'class-validator';

export function validatePassword(value: string, args: ValidationArguments) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  if (!passwordRegex.test(value)) {
    return false;
  }
  return true;
}
