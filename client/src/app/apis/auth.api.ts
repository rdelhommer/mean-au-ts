import { autoinject } from "aurelia-framework";
import { json } from 'aurelia-fetch-client';
import { IHttp } from "app/services/http/http.service";
import { AuthDto, UserDto, GeneralDto, Utilities } from "mean-au-ts-shared";

@autoinject
export class AuthApi {
  get baseUrl() {
    return 'api/auth/';
  }

  constructor(
    private http: IHttp
  ) { }

  signin(credentials: AuthDto.SignInDto): Promise<UserDto.UserPublicDto> {
    return this.http.post(`${this.baseUrl}signin`, credentials).then(responseBody => {
      return Utilities.castTo<UserDto.UserPublicDto>(responseBody.data, UserDto.UserPublicDto);
    });
  }

  signup(newUser: AuthDto.SignUpDto): Promise<UserDto.UserPublicDto> {
    return this.http.post(`${this.baseUrl}signup`, newUser).then(responseBody => {
      return Utilities.castTo<UserDto.UserPublicDto>(responseBody.data, UserDto.UserPublicDto);
    });
  }
  
  signout(): Promise<void> {
    return this.http.post(`${this.baseUrl}signout`).then(responseBody => undefined);
  }

  sendForgotPassword(body: AuthDto.SendForgotPasswordDto): Promise<void> {
    return this.http.post(`${this.baseUrl}send-forgot-password`, body).then(responseBody => undefined);
  }

  testForgotPassword(params: AuthDto.TestForgotPasswordDto): Promise<void> {
    return this.http.get(`${this.baseUrl}forgot-password`, params, false).then(responseBody => undefined);
  }

  resetForgottenPassword(body: AuthDto.ForgotPasswordDto): Promise<void> {
    return this.http.post(`${this.baseUrl}forgot-password`, body).then(responseBody => undefined);
  }
}
