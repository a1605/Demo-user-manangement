import { MINIMUM_LENGTH } from '../../../constant';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { MAXIMUM_LENGTH } from 'constant';
import { validatePassword } from 'utils';


export class CreateUpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(MINIMUM_LENGTH, MAXIMUM_LENGTH, {
    message: 'Username length should be between 8 and 15 characters',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(MINIMUM_LENGTH, MAXIMUM_LENGTH, {
    message: 'Password length should be between 8 and 15 characters',
  })
  @Validate(validatePassword, {
    message:
      'Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
  })
  password: string;
}
