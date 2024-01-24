import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserdto{
    
    @IsNotEmpty()
    @IsString()
    username:string

    
    @IsNotEmpty()
    @IsString()
    password:string
}