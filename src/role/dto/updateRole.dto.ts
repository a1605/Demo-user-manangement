import { IsString } from "class-validator"

export class UpdateRoleDto{
    @IsString()
    name?:String
    @IsString()
    slug?:String
}

