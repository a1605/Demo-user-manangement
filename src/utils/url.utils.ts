import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isLocalhostUrl', async: false })
export class IsLocalhostUrl implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return typeof value === 'string' && value.startsWith('http://localhost:');
  }

  defaultMessage(args: ValidationArguments) {
    return 'URL must be a valid localhost URL';
  }
}
