import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ShootingStars } from './ui/shooting-stars'
import { Separator } from '@radix-ui/react-separator'

const login = () => {
  return (
    <div className="flex h-screen w-full z-30 flex-col justify-center items-center pb-5 pt-[13vh] mt-[-8rem]">
      <Card className="w-[90vw] max-w-[360px] relative overflow-hidden">
        <ShootingStars/>
        <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Login to continue</CardDescription>
        </CardHeader>
        <Separator className="mt-[-0.6rem] mb-[0.8rem]" />
        </Card>
    </div>
  )
}

export default login