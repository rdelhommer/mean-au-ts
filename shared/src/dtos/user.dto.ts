import { Enums } from "..";
import { required, email, phone } from "../decorators/validation.decorators";

export namespace UserDto {
  export class UserPublicDto {
    firstName: string = undefined
    lastName: string = undefined
    email: string = undefined
    phone: string = undefined
    displayName: string = undefined
    roles: Enums.UserRoles[] = []
  }
}
