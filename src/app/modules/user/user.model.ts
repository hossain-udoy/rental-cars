/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		phone: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	const user = this;
	user.password = await bcrypt.hash(
		user.password,
		Number(config.bcrypt_salt_rounds)
	);
	next();
});

 
userSchema.set("toJSON", {
	transform: function (doc, ret) {
		delete ret.password;
		return ret;
	},
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
	return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
	plainTextPassword: string,
	hashedPassword: string
) {
	return await bcrypt.compare(plainTextPassword, hashedPassword);
};
export const User = model<TUser, UserModel>("User", userSchema);
