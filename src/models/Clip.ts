import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";


export type ClipModel = mongoose.Document & {
  timeline: string
  autor: string,
  clip: string,
  anexo: {
    nome: String,
    mime: String,
    base64: String
  }
};

const clipSchema = new mongoose.Schema({
  timeline: String,
  autor: String,
  clip: String,
  anexo: {
    nome: String,
    mime: String,
    base64: String
  }
}, { timestamps: true });

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const Clip = mongoose.model<ClipModel>("Clip", clipSchema);
export default Clip;