import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";


export type TimelineModel = mongoose.Document & {
  autor: String,
  nome: String,
  colaboradores: [{autor: String}]
};

const timelineSchema = new mongoose.Schema({
  autor: String,
  nome: String,
  colaboradores: [{autor: String}]
}, { timestamps: true });

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const Timeline = mongoose.model<TimelineModel>("Timeline", timelineSchema);
export default Timeline;