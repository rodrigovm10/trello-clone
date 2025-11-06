import { Menu } from 'lucide-react'
import { Sidebar } from './sidebar'
import { getWorkspaces } from '../actions/get-workspace'
import { buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export async function MenuMobile() {
  const workspaces = await getWorkspaces()

  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: 'ghost', className: 'md:hidden' })}>
        <Menu size={32} />
      </SheetTrigger>
      <SheetContent
        side='left'
        className='w-64'
      >
        <section className='px-2 mt-8'>
          <Sidebar
            className='w-full '
            workspaces={workspaces}
            isMobile={true}
          />
        </section>
      </SheetContent>
    </Sheet>
  )
}
