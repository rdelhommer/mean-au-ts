import {required, email, phone, password} from '../decorators/validation.decorators'

export namespace AuthDto {
  export class SignInDto {
    @required('Please provide your email')
    @email()
    email: string = undefined

    @required('Please provide a password')
    @password()
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
}
