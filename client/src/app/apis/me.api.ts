import { autoinject } from "aurelia-framework";
import { json } from 'aurelia-fetch-client';
import { IHttp } from "app/services/http/http.service";
import { GeneralDto, UserDto, Utilities, MeDto } from "mean-au-ts-shared";

@autoinject
export class MeApi {
  get baseUrl() {
    return 'api/me/';
  }

  constructor(private http: IHttp) { }

  me(): Promise<UserDto.UserPublicDto> {
    return this.http.get(this.baseUrl).then(response => {
      return Utilities.castTo<UserDto.UserPublicDto>(response.data, UserDto.UserPublicDto);
    });;
  }

  changePassword(body: MeDto.ChangePasswordDto): Promise<any> {
    return this.http.post(`${this.baseUrl}/change-password`, body);
  }
}
