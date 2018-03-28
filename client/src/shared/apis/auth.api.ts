import { autoinject } from "aurelia-framework";
import { json } from 'aurelia-fetch-client';
import { AuthDto, UserDto, GeneralDto, Utilities } from "mean-au-ts-shared";
import { IHttp } from "shared/services/http/http.service";
import { IAuth } from "shared/services/auth/auth.service";

@autoinject
export class AuthApi {
  get baseUrl() {
    return 'api/auth/';
  }

  constructor(
    private http: IHttp,
    private auth: IAuth
  ) { }

  signin(credentials: AuthDto.SignInDto): Promise<UserDto.UserPublicDto> {
    return this.http.post(`${this.baseUrl}signin`, credentials).then(responseBody => {
      let ret = Utilities.castTo<UserDto.UserPublicDto>(responseBody.data, UserDto.UserPublicDto);
      this.auth.signIn(ret);
      return ret;
    });
  }

  signup(newUser: AuthDto.SignUpDto): Promise<UserDto.UserPublicDto> {
    return this.http.post(`${this.baseUrl}signup`, newUser).then(responseBody => {
      let ret = Utilities.castTo<UserDto.UserPublicDto>(responseBody.data, UserDto.UserPublicDto);
      this.auth.signIn(ret);
      return ret;
    });
  }
  
  signout(): Promise<void> {
    return this.http.post(`${this.baseUrl}signout`).then(responseBody => {
      this.auth.signOut();
    });
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
