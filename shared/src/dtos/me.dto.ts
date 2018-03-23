import { required, password } from "../decorators/validation.decorators";

export namespace MeDto {
  export class ChangePasswordDto {
    @required('Please enter your current password')
    currentPassword: string = undefined

    @required('Please enter a new password')
    @password()
    newPassword: string = undefined

    @required('Please verify your new password')
    @password()
    verifyPassword: string = undefined
  }
}
