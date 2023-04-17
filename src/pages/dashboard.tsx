import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'

function Dashboard() {
  const { email, signOut } = useAuthUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <header className="flex justify-end w-full p-4 fixed top-0 right-0 bg-gray-100">
        <button onClick={signOut}>Sign out</button>
      </header>

      <h1 className="text-4xl font-bold">Dashboard: {email}</h1>
    </main>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(async ({ AuthUser }) => {
  console.log(AuthUser)

  return {
    props: {}
  }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Dashboard)
