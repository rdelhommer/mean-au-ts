import { autoinject } from "aurelia-framework";
import { json } from 'aurelia-fetch-client';
import { IHttp } from "app/services/http/http.service";
import { AuthDto, UserDto, GeneralDto, Utilities } from "mean-au-ts-shared";

@autoinject
export class AuthApi {
  get baseUrl() {
    return 'api/auth/';
  }

  constructor(private http: IHttp) { }

  signin(credentials: AuthDto.SignInDto): Promise<UserDto.UserPublicDto> {
    return this.http.post(`${this.baseUrl}signin`, credentials).then(response => {
      return Utilities.castTo<UserDto.UserPublicDto>(response.data, UserDto.UserPublicDto);
    });
  }

  signup(newUser: AuthDto.SignUpDto): Promise<UserDto.UserPublicDto> {
    return this.http.post(`${this.baseUrl}signup`, newUser).then(response => {
      return Utilities.castTo<UserDto.UserPublicDto>(response.data, UserDto.UserPublicDto);
    });
  }
  
  signout(): Promise<any> {
    return this.http.post(`${this.baseUrl}signout`);
  }
}