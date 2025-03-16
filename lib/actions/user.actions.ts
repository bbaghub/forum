'use server'

import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import { connectToBD } from "../mongoose"


interface Params{
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path,
}: Params) : Promise<void>{
    await connectToBD();

    try{
        await User.findOneAndUpdate(
            {id: userId},
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true
            },
            {upsert: true, new: true}
        )
        if (path === '/profile/edit'){
            revalidatePath(path)
        }
    }catch(error: any){
        console.error('MongoDB Update Error:', error);

        throw new Error(`Failed to create/update user: ${error.message}`)
    }
}