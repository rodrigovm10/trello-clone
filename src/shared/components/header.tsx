import Link from 'next/link'
import { Trello } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { createClient } from '@/db/supabase/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CreateBoard } from './header/create-board'

export async function Header() {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  const isLoggedIn = !!data.user

  return (
    <header className='py-2 px-4 border border-slate-100 m-0 flex justify-between items-center'>
      <section className='flex items-center gap-4'>
        <h1 className='text-2xl font-bold flex items-center gap-4'>
          <Trello className='size--6 text-primary' />
          Trello
        </h1>
        <CreateBoard />
      </section>
      <nav>
        <ul className='flex gap-4'>
          <li className={isLoggedIn ? 'hidden' : ''}>
            <Link
              href='/auth/login'
              className={buttonVariants({ variant: 'default' })}
            >
              Login
            </Link>
          </li>
          <li className={isLoggedIn ? 'hidden' : ''}>
            <Link
              href='/auth/login'
              className={buttonVariants({ variant: 'secondary' })}
            >
              Get started for free
            </Link>
          </li>
          <li className={isLoggedIn ? '' : 'hidden'}>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className='size-10 cursor-pointer'>
                  <AvatarImage src={data.user?.user_metadata.avatar_url} />
                  <AvatarFallback>{data.user?.user_metadata.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    </header>
  )
}
