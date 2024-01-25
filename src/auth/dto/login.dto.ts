import { IsNotEmpty, IsString, Length } from "class-validator"

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    username:string
    
    @IsNotEmpty()
    @IsString()
    password:string

}