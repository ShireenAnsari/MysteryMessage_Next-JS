import bcryptjs from 'bcryptjs'
import { sendVerificationEmail } from '@/helpers/sendVerificationemail'
import dbConnect from '@/lib/dbconnect'
export async function POST(request:Request)
{
    await dbConnect()
    try {
        const {username,email,password}=await request.json()
        
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