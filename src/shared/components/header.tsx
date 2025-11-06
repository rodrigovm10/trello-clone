import Link from 'next/link'
import { Trello } from 'lucide-react'
import { UserAvatar } from './user-avatar'
import { createClient } from '@/db/supabase/server'
import { CreateBoard } from './header/create-board'
import { buttonVariants } from '@/components/ui/button'
import { MenuMobile } from '@/features/workspace/components/menu-mobile'

export async function Header() {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  const isLoggedIn = !!data.user

  return (
    <header className='py-2 px-4 border border-slate-100 m-0 flex justify-between items-center'>
      <section className='flex items-center gap-4'>
        {isLoggedIn && <MenuMobile />}
        <h1 className='text-2xl font-bold flex items-center gap-4'>
          <Trello
            className='text-primary'
            size={32}
          />
          <span className={`${isLoggedIn ? 'hidden md:block' : 'block'}`}>Trello</span>
        </h1>
        {isLoggedIn && <CreateBoard />}
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
            <UserAvatar user={data.user!} />
          </li>
        </ul>
      </nav>
    </header>
  )
}
