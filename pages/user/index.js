import { useSession, signOut } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  return (
    <div>
      <h1>login page</h1>
      {session && <p>Signed in as {session.user.email}</p>}
      {!session && <p>Not signed in</p>}
    </div>
  );
}
