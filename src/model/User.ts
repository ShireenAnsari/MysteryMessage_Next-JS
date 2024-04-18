import mongoose,{Schema,Document} from 'mongoose';
export interface Message extends Document{
    content:string;
    createdAt:Date
}
const MessageSchema: Schema<Message>=new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }

})
export interface User extends Document{
    username:string;
    email:string;
    password:string;
    createdAt:Date;
    VerifyCode:string;
    VerifyCodeExpiry:Date;
    isAcceptingMessage:boolean;
    message:Message[]
}
const UserSchema: Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        // match:['Please use a valid email address']
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }

})