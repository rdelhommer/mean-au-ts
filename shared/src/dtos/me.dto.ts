import { required, password, sameAs } from "../decorators/validation.decorators";

export namespace MeDto {
  export class ChangePasswordDto {
    @required('Please enter your current password')
    currentPassword: string = undefined

    @required('Please enter a new password')
    @password()
    newPassword: string = undefined

    @required('Please verify your new password')
    @password()
    @sameAs<ChangePasswordDto>('newPassword', 'Your new passwords do not match')
    verifyPassword: string = undefined
  }
}
