import { required, password } from "../decorators/validation.decorators";

export namespace MeDto {
  export class ChangePasswordDto {
    @required()
    @password()
    newPassword: string = undefined
    
    @required()
    @password()
    currentPassword: string = undefined
    
    @required()
    @password()
    verifyPassword: string = undefined
  }
}