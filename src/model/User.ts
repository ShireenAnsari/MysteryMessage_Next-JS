import mongoose,{Schema,Document} from 'mongoose';
export interface Message extends Document{
    conten:string;
    createdAt:Date
}