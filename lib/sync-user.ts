import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

// syncing our clerk use to databace

export async  function syncCurrentuser(){
    try{
        // get user data from clerk

        const clerkUser= await currentUser()

        if(!clerkUser){
            return null

        }

        const email= clerkUser.emailAddresses[0]?.emailAddress

        if(!email){
            throw new Error("user email is not Found")
        }

        let dbUser= await prisma.user.findUnique({
            where:{clerkUserId:clerkUser.id}
        })


        if(dbUser){
            // update existing user
            dbUser= await prisma.user.update({
                where:{
                    id:dbUser.id
                },
                data:{
                    email,
                    name:`${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                    image:clerkUser.imageUrl

                }

            });

        }




    else{
        // create a new user in database

        const userCount= await prisma.user.count()
        const isFirstUser= userCount===0;

        dbUser=await prisma.user.create({
            data:{
                clerkUserId:clerkUser.id,
                email,
                 name:`${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                 image:clerkUser.imageUrl,
                 role:isFirstUser? "admin":"user"

            }
        })

        console.log(`New user created :${email} with role :${dbUser.role}`)

    }
    return dbUser
 } catch(error){
    console.error("error syncing user from clerk:" , error)
    throw error

    }
}