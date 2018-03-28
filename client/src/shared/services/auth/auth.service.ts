import { NavigationInstruction } from "aurelia-router";
import { UserDto } from "mean-au-ts-shared";

export abstract class IAuth { 
  abstract get currentUser(): UserDto.UserPublicDto;
  
  abstract authorizeRequest(req: Request): Request
  abstract processResponse(response: Response): Response
  abstract signIn(user: UserDto.UserPublicDto): void
  abstract signOut(): void
}
