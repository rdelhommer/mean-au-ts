import * as mongoose from "mongoose";
import { Enums } from "mean-au-ts-shared";

export interface IUserExt {
  hashPassword(password: string): string
  isAuthenticated(password: string): boolean
  getHighestRole(): Enums.UserRoles
  isAnonymous(): boolean
}

export interface IUser {
  id: mongoose.Types.ObjectId
  firstName: string
  lastName: string
  displayName: string
  email: string
  phone: string
  roles: Enums.UserRoles[]
}

export interface IUserModel extends IUser, IUserExt, mongoose.Document {
  id: mongoose.Types.ObjectId
  password: string
  salt: string
  updated: Date
  created: Date
  resetPasswordToken?: string
  resetPasswordExpires?: string
}