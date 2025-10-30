import {
  Supadata,
  Transcript 
} from '@supadata/js';
import { NextResponse } from 'next/server';

const supadata = new Supadata({
  apiKey: process.env.SUPDATA_API_KEY || "",
});


export async function POST(request: Request) {
    const {videoId} = await request.json();

    if(!videoId){
        return NextResponse.json({
            error: "No videoId provided"
        }, {status: 400})
    }

    const transcript: Transcript = await supadata.youtube.transcript({
      url: `https://youtu.be/${videoId}`,
    });

    return NextResponse.json({
        transcript: transcript
    })
    

}
