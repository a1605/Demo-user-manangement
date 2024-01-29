import { IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import { MAX_STRING_LEN, MIN_STRING_LEN } from 'constant';
import { IsLocalhostUrl } from 'src/utils/url.utils';
import { Url } from 'url';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  @Length(MIN_STRING_LEN, MAX_STRING_LEN, {
    message: 'Permission name should be between 5 and 30 characters',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Validate(() => IsLocalhostUrl, {
    message: 'URL must be a valid localhost URL',
  })
  url: string;
}
