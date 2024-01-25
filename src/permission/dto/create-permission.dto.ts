import { IsNotEmpty, IsString, IsUrl, isURL } from "class-validator"
import { Url } from "url"

export class CreatePermissionDto{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url:string

    
}