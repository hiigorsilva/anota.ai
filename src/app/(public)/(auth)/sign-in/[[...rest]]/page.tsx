'use client'

import { loginAction } from '@/actions/auth'
import Google from '@/assets/icon/google.svg'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

const SignInPage = () => {
  const handleLoginForm = async () => {
    await loginAction()
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="text-center">Faça seu login</CardTitle>
        <CardDescription className="text-center">
          Entre com sua conta do Google
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          className="w-full"
          variant="secondary"
          onClick={handleLoginForm}
        >
          <Image src={Google} alt="Google" width={18} height={18} />
          Entrar com o Google
        </Button>
      </CardContent>
    </Card>
  )
}

export default SignInPage
