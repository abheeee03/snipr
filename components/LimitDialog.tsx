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


  const ratings = [
    { value: '1', label: 'Angry', icon: '😡' },
    { value: '2', label: 'Sad', icon: '🙁' },
    { value: '3', label: 'Neutral', icon: '🙂' },
    { value: '4', label: 'Happy', icon: '😁' },
    { value: '5', label: 'Laughing', icon: '🤩' }
  ]

  return (
    <Dialog onOpenChange={onChange} open={open}>
      <form>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-xl'>You've Reached daily limit !</DialogTitle>
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
