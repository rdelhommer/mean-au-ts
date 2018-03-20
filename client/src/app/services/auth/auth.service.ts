export abstract class IAuth { 
  abstract get isAuthenticated(): boolean;

  abstract authorizeRequest(req: Request): Request;
  abstract storeAuth(response: Response): Response;
  abstract clearAuth():void;
}