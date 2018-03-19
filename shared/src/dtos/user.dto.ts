import { Enums } from "..";

export namespace UserDto {
  export class UserPublicDto {
    firstName: string = undefined
    lastName: string = undefined
    displayName: string = undefined
    email: string = undefined
    phone: string = undefined
    roles: Enums.UserRoles[] = []
  }
}
