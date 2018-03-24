import {required, email, phone, password, sameAs} from '../decorators/validation.decorators'

export namespace AuthDto {
  export class SignInDto {
    @required('Please provide your email')
    @email()
    email: string = undefined

    @required('Please provide a password')
    password: string = undefined
  }

  export class SignUpDto {
    @required('Please provide your first name')
    firstName: string = undefined

    @required('Please provide your last name')
    lastName: string = undefined

    @required('Please provide your email')
    @email()
    email: string = undefined

    @required('Please provide a password')
    @password()
    password: string = undefined

    @phone()
    phone: string = undefined
  }

  export class ForgotPasswordDto {
    @required()
    forgotPasswordToken: string = undefined

    @required('Please enter a new password')
    @password()
    newPassword: string = undefined

    @required('Please verify your new password')
    @password()
    @sameAs<ForgotPasswordDto>('newPassword', 'Your new passwords do not match')
    verifyPassword: string = undefined
  }

  export class SendForgotPasswordDto {
    @required()
    @email()
    email: string = undefined
  }

  export class TestForgotPasswordDto {
    @required()
    forgotPasswordToken: string = undefined
  }
}
