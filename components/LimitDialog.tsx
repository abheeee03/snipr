import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ReactNode } from 'react';

const LimitDialog = ({ open, onChange, content, closeBtnVisible = true }: { open: boolean; onChange: (open: boolean) => void, content: ReactNode, closeBtnVisible?: boolean }) => {

  return (
    <Dialog onOpenChange={onChange} open={open}>
      <form>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-xl'>You&apos;ve Reached daily limit !</DialogTitle>
          </DialogHeader>
          {content}
            <DialogFooter className='sm:justify-end'>
              {closeBtnVisible && <DialogClose asChild>
                <Button variant='outline'>Got it</Button>
              </DialogClose>}
            </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default LimitDialog
