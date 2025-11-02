"use client"

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog"
import { FaGoogle } from "react-icons/fa6"
import { handelSignin } from "@/lib/utils"


export default function AuthScreen({open, onOpenChange}: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
}) {
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
