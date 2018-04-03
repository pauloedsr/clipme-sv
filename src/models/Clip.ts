import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";

export type ClipModel = mongoose.Document & {
  idUser: string,
  clip: string
};

const clipSchema = new mongoose.Schema({
  idUser: String,
  clip: String
}, { timestamps: true });


// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const Clip = mongoose.model("Clip", clipSchema);
export default Clip;