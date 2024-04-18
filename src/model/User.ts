import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    VerifyCode: string;
    VerifyCodeExpiry: Date;
    isVerified:boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    
    VerifyCode:{
        type:String,
        required:[true,'Verification code is required']
    },
    VerifyCodeExpiry:{
    type:Date,
    required:[true,'Verification code Expiry is required']
    },
    isVerified:{
    type:Boolean,
    default:false
    },
    isAcceptingMessage:{
     type:Boolean,
     default:true   
    },
    messages:[MessageSchema],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});
const UserModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User',UserSchema)
export default UserModel;
