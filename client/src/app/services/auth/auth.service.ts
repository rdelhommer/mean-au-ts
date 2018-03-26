import { NavigationInstruction } from "aurelia-router";

export abstract class IAuth { 
  abstract get isAuthenticated(): boolean;

  abstract authorizeRequest(req: Request): Request;
  abstract signIn(response: Response): Response;
  abstract signOut():void;
  abstract isNavigationAuthorized(instruction: NavigationInstruction): boolean;
}
