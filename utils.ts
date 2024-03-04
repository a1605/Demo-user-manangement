import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

export function validatePassword(value: string, args: ValidationArguments) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  if (!passwordRegex.test(value)) {
    return false;
  }
  return true;
}
export function urlCorrection(url: string) {
  const urlParts = url.split('/');
  return urlParts.slice(3).join('/');
}

export class CommonColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

@ValidatorConstraint({ name: 'isLocalhostUrl', async: false })
export class IsLocalhostUrl implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return typeof value === 'string' && value.startsWith('http://localhost:');
  }

  defaultMessage(args: ValidationArguments) {
    return 'URL must be a valid localhost URL';
  }
}
export function skipCount(page,limit)
{
  return (page - 1) * limit;
}
