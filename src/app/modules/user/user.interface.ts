/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
    toObject(): Omit<TUser, "password">;
	name: string;
	email: string;
	role: "user" | "admin";
    password: string;
    phone: string;
    address: string;
};

export interface UserModel extends Model<TUser>{
    // instance method for checking if the user exist 
    isUserExistsByEmail(email: string): Promise<TUser>

    // instance method for checking if the password matched 
    isPasswordMatched(plainTextPassword:string,hashedPassword:string):Promise<boolean>
    
}
export type TUserRole =keyof typeof USER_ROLE