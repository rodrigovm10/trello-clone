'use client'

import { LoginButton } from '@/features/auth/components/login-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useTransition } from 'react'
import { Provider } from '../types/login'
import { signInWith } from '../actions/auth'

export function LoginCard() {
  const [isPending, startTransition] = useTransition()
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null)

  const handleSignInWith = (provider: 'google' | 'github') => {
    setLoadingProvider(provider)
    startTransition(() => {
      signInWith(provider)
    })
  }

  return (
    <Card className='max-w-xs mx-auto duration-500 animate-in fade-in-5 slide-in-from-bottom-5 mt-12'>
      <CardHeader>
        <CardTitle className='text-xl'> Trello clone</CardTitle>
        <CardDescription>Log in with your favorite provider</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 justify-center'>
        <LoginButton
          provider='google'
          onClick={handleSignInWith}
          isPending={loadingProvider === 'google' && isPending}
          disabled={loadingProvider === 'github'}
        />
        <LoginButton
          provider='github'
          onClick={handleSignInWith}
          isPending={loadingProvider === 'github' && isPending}
          disabled={loadingProvider === 'google'}
        />
      </CardContent>
    </Card>
  )
}
