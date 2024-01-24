import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
export class CreateRoleDto{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsString()
    slug:string

}