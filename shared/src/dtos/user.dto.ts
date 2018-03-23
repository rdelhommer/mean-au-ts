import { Enums } from "..";
import { required, email, phone } from "../decorators/validation.decorators";

export namespace UserDto {
  export class UserPublicDto {
    @required()
    firstName: string = undefined

    @required()
    lastName: string = undefined

    @required()
    @email()
    email: string = undefined

    @phone()
    phone: string = undefined

    displayName: string = undefined
    roles: Enums.UserRoles[] = []
  }
}
