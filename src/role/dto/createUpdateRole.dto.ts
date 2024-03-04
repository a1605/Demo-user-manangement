import { IsString, Length } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { MAX_STRING_LEN, MIN_STRING_LEN } from 'constant';
export class CreateUpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  @Length(MIN_STRING_LEN, MAX_STRING_LEN, {
    message: 'Role name should be between 5 and 30 characters',
  })
  name: string;
}
