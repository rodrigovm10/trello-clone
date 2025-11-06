'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { createWorkspace } from '@/features/workspace/actions/create-workspace'
import { toast } from 'sonner'

const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(1, 'Workspace name is required')
    .max(50, 'Workspace name must be less than 50 characters'),
})

type CreateWorkspaceForm = z.infer<typeof createWorkspaceSchema>

export function CreateWorkspace() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<CreateWorkspaceForm>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: CreateWorkspaceForm) => {
    startTransition(async () => {
      try {
        await createWorkspace(data.name)
        form.reset()
        setOpen(false)
        toast.success('Workspace created successfully')
      } catch (error) {
        toast.error('Failed to create workspace')
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
          variant='ghost'
          size='icon'
          className='rounded-full'
        >
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new workspace</DialogTitle>
          <DialogDescription>Create a new workspace to organize your projects.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter workspace name'
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end space-x-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={isPending}
              >
                {isPending && <Spinner className='mr-2' />}
                Create workspace
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
