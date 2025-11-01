"use client"

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog"
import { FaGoogle } from "react-icons/fa6"
import { createClient } from "@/lib/supabase/client"


export default function AuthScreen({open, onOpenChange}: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
}) {

    const handelSignin = async ()=>{
        const supabase = createClient()
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
    }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Signin To Your Account</DialogTitle>
            <DialogDescription className="text-sm mb-10">
              Use Following Methods to Get Started and Use Snipr at Its Full Potential.
            </DialogDescription>
          </DialogHeader>

          <div className="">
            <Button 
            onClick={handelSignin}
            className="w-full mb-2">
                Signin With Google <FaGoogle />
            </Button>
          </div>

        </DialogContent>
    </Dialog>
  )
}
