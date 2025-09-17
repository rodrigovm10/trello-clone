import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export function Header() {
  return (
    <header className='p-4 border border-slate-100 m-0 flex justify-between items-center'>
      <h1 className='text-2xl font-bold'>Trello Clone</h1>
      <nav>
        <ul className='flex gap-4'>
          <li>
            <Link
              href='/auth/login'
              className={buttonVariants({ variant: 'default' })}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href='/auth/login'
              className={buttonVariants({ variant: 'secondary' })}
            >
              Get started for free
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
