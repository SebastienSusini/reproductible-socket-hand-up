import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const session = useSession();

  return (
    <>
      {" "}
      <div>{session?.data?.user?.name}</div>
      {session?.data ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <button onClick={() => signIn("google")}>Login</button>
      )}
    </>
  );
}
