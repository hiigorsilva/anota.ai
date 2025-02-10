import { getUserClerk } from '@/lib/clerk'
import { SignIn } from '@clerk/nextjs'

const SignInPage = async () => {
  await getUserClerk()

  return (
    <>
      <SignIn />
    </>
  )
}

export default SignInPage
