'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { createBoard } from '@/features/board/actions/create-board'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { BOARD_BACKGROUNDS } from '../utils/constants'

const createBoardSchema = z.object({
  title: z
    .string()
    .min(1, 'Board title is required')
    .max(50, 'Board title must be less than 50 characters'),
  background: z.string().min(1, 'Please select a background'),
})

type CreateBoardForm = z.infer<typeof createBoardSchema>

interface CreateNewBoardProps {
  workspaceId: string
}

export function CreateNewBoard({ workspaceId }: CreateNewBoardProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<CreateBoardForm>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: '',
      background: '',
    },
  })

  const onSubmit = async (data: CreateBoardForm) => {
    startTransition(async () => {
      try {
        await createBoard({
          title: data.title,
          background: data.background,
          workspaceId,
        })
        form.reset()
        setOpen(false)
        toast.success('Board created successfully')
      } catch (error) {
        toast.error('Failed to create board')
      }
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='w-full h-full min-h-[8rem] sm:min-h-[10rem] rounded-md flex flex-col items-center justify-center border-dashed border-2 hover:bg-accent/50 transition-colors'
          size='lg'
        >
          <span className='text-xs sm:text-sm md:text-base'>Create new board</span>
          <Plus className='w-4 h-4 sm:w-5 sm:h-5' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-md mx-4 sm:mx-auto'>
        <DialogHeader>
          <DialogTitle>Create new board</DialogTitle>
          <DialogDescription>Create a new board to organize your projects.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='background'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background</FormLabel>
                  <FormControl>
                    <div className='grid grid-cols-4 gap-2 sm:gap-3'>
                      {BOARD_BACKGROUNDS.map(bg => (
                        <button
                          key={bg.id}
                          type='button'
                          onClick={() => field.onChange(bg.value)}
                          className={cn(
                            'relative h-12 sm:h-14 md:h-16 rounded-md transition-all hover:scale-105',
                            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                            field.value === bg.value && 'ring-2 ring-primary ring-offset-2'
                          )}
                          style={{ background: bg.value }}
                          title={bg.label}
                          disabled={isPending}
                        >
                          {field.value === bg.value && (
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <Check className='w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg' />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter board title'
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-col sm:flex-row justify-end gap-2 sm:gap-2 pt-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(false)}
                disabled={isPending}
                className='w-full sm:w-auto'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={isPending}
                className='w-full sm:w-auto'
              >
                {isPending && <Spinner className='mr-2' />}
                Create board
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
