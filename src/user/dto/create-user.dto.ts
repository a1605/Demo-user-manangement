import { IsEmail, IsNotEmpty, IsString, Length, Validate } from "class-validator"
import { validatePassword } from "src/utils/password.utils"

export class CreateUserdto{
    
    @IsNotEmpty()
    @IsString()
    username:string

    
    @IsNotEmpty()
    @IsString()
    @Length(8, 15, { message: 'Password length should be between 8 and 15 characters' })
    @Validate(validatePassword, { message: 'Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character' })

    password:string

}