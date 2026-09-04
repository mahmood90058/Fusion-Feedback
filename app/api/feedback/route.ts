import { prisma } from "@/lib/prisma";
import { syncCurrentuser } from "@/lib/sync-user";
import { NextRequest, NextResponse } from "next/server";

// create a feedbac

export async function POST(request:NextRequest){
    try{
        const dbUser= await syncCurrentuser()
        if(!dbUser){
            return NextResponse.json({error:"Unauthorised"}, {status:401})
        }

        const body= await request.json()
        const {title, description, category}= body;
        const post = await prisma.post.create({
            data:{
                title,
                description,
                category,
                authorId:dbUser.id,


            }
        })

        return NextResponse.json(post);

    }

    catch(error){

        console.error("error creating post", error)
        return NextResponse.json({
            error:"internal server error"
        }, {status:500})


    }
}



// get all feedback

export async function GET(){
    try{
        const posts= await prisma.post.findMany({
            include:{
                author:true,
                votes:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })


        return NextResponse.json(posts)




    }
    catch(error){
            console.error("error fetching  post", error)
        return NextResponse.json({
            error:"internal server error"
        }, {status:500})

    }
}