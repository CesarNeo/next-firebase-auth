import { app } from '@/config/firebase'
import { getAuth } from 'firebase/auth'
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'
import {
  useSignInWithEmailAndPassword,
  useIdToken
} from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'

type LoginFormData = {
  email: string
  password: string
}

const MyLoader = () => (
  <div className="flex min-h-screen flex-col items-center justify-center">
    Loading...
  </div>
)

const auth = getAuth(app)

function Home() {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

  const { register, handleSubmit } = useForm<LoginFormData>()

  async function handleLogin(data: LoginFormData) {
    await signInWithEmailAndPassword(data.email, data.password)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-4 items-center justify-center  w-96  h-96 bg-gray-100 rounded-md shadow-md "
      >
        <input
          className="w-80 h-10 rounded-md shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          type="email"
          placeholder="E-mail"
          {...register('email')}
        />
        <input
          className="w-80 h-10 rounded-md shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          type="password"
          placeholder="Password"
          {...register('password')}
        />

        <button
          type="submit"
          className="w-80 h-10 rounded-md shadow-md bg-blue-600 text-white font-bold"
        >
          Login
        </button>
      </form>
    </main>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP
})(async ({ AuthUser }) => {
  console.log(AuthUser)

  return {
    props: {}
  }
})

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedAfterInit: AuthAction.RENDER
})(Home)
