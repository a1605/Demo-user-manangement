import { IsNotEmpty, IsString, Validate} from "class-validator"
import { IsLocalhostUrl } from "src/utils/url.utils"
import { Url } from "url"

export class CreatePermissionDto{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    @Validate(() => IsLocalhostUrl, { message: 'URL must be a valid localhost URL' })
    url:string

    
}