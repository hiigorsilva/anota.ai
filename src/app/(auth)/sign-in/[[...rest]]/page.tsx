import { SignIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const SignInPage = async () => {
  const user = await currentUser()
  if (user?.id) {
    redirect('/')
  }

  return (
    <>
      <SignIn />
    </>
  )
}

export default SignInPage
