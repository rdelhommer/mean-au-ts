import { model, Schema, Document } from "mongoose";
import { IUserExt, IUserModel } from "data-model/user/user.model";
import { hashPassword } from "data-model/user/ext/hash-password.ext";
import { isAuthenticated } from "data-model/user/ext/is-authenticated.ext";
import { getHighestRole } from "data-model/user/ext/get-highest-role.ext";
import { validateEmail } from "data-model/user/hooks/validate-email.hook";
import { hashPasswordHook } from "data-model/user/hooks/hash-password.hook";
import { isAnonymous } from "./ext/is-anonymous.ext";
import { Enums } from "mean-au-ts-shared";

let UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  displayName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    },
    lowercase: true,
    trim: true,
    required: true
  },
  phone: {
    type: String,
    required: 'Please provide a phone number that you can be contacted at'
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  roles: {
    type: [{
      type: String,
      enum: [
        Enums.UserRoles.Admin,
        Enums.UserRoles.Technician
      ]
    }],
    default: [Enums.UserRoles.Technician],
    required: 'Please provide at least one role'
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});

let extensions: IUserExt = {
  hashPassword: hashPassword,
  isAuthenticated: isAuthenticated,
  getHighestRole: getHighestRole,
  isAnonymous: isAnonymous
};

Object.assign(UserSchema.methods, extensions);

UserSchema.pre('validate', validateEmail);
UserSchema.pre('validate', hashPasswordHook);

export const UserModel = model<IUserModel>('User', UserSchema);
