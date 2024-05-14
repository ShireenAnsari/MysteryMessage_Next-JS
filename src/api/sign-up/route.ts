import bcryptjs from 'bcryptjs'
import { sendVerificationEmail } from '@/helpers/sendVerificationemail'
import dbConnect from '@/lib/dbconnect'
import UserModel from '@/model/User'
export async function POST(request:Request)
{
    await dbConnect()
    try {
        const {username,email,password}=await request.json()
    const existingUserVerifiedByusername=    await UserModel.findOne({
            username,
            isVerified:true
        })
        if(existingUserVerifiedByusername)
            {
                return Response.json({
                    success:false,
                    message:'Username already taken'
                },
                {
                    status:400
                }
            )
            }
   const existingUserByemail= await UserModel.findOne({email})
   const VerifyCode=Math.floor(10000+Math.random()*900000).toString()
   if(existingUserByemail)
    {
        if(existingUserByemail.isVerified)
            {
                return Response.json({
                    success:false,
                    message:'User already exist with this email'
                },{
                    status:400
                })
            }
            else{
                const hashedPassword=await bcryptjs.hash(password,10)
                existingUserByemail.password=hashedPassword;
                existingUserByemail.VerifyCode=VerifyCode;
                existingUserByemail.VerifyCodeExpiry=new Date(Date.now()+3600000
                )
                await existingUserByemail.save()
            }
    }
    else{
       const hashedPassword= await bcryptjs.hash(password,10)
       const expiryDate=new Date()
       expiryDate.setHours(expiryDate.getHours()+1)
   const newUser=  new UserModel({
        username,
        email,
        password: hashedPassword,
        VerifyCode:VerifyCode,
        VerifyCodeExpiry:expiryDate,
        isVerified:false,
        isAcceptingMessage: true,
        messages: [],
       })
       await newUser.save()
    //    send verification email
 const emailResponse=   await sendVerificationEmail(
        email,
        username,
        VerifyCode
    )
    if(!emailResponse.success)
        {
            return Response.json({
                success:false,
                message:emailResponse
            },{
                status:500
            })
        }
        return Response.json({
            success:true,
            message:'User registered successfully Please verify your email'
        },{
            status:201
        })
    }
    
    } catch (error) {
        console.error('Error registering user',error)
        return Response.json(
            {
                success:false,
                message:'Error registering user'
            },
            {
                status:500
            }
        )
        
    }
}