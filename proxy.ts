import { NextRequest, NextResponse } from "next/server"
import { rateLimiter } from "./lib/rateLimiter"

export default async function proxy(req: NextRequest) {
  
    const xff = req.headers.get("x-forwarded-for");
  const xReal = req.headers.get("x-real-ip");
  const ip =
    typeof xff === "string" && xff.length
      ? xff.split(",")[0].trim()
      : (xReal as string | undefined) ||
       
        undefined;
    console.log(ip);
        
    // const {success} = await rateLimiter.limit(ip as string);
    
    // if(!success){        
    //     return NextResponse.json({
    //         error: "Too many requests. Please try again later."
    //     }, {
    //         status: 429,
    //     })
    // }

    // if(success){
        NextResponse.next()
    // }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}