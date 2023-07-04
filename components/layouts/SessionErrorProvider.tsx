import React from 'react';
import { useIntercom } from 'react-use-intercom';

import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';


interface SessionErrorProviderProps {
  children: React.ReactNode;
}

export default function SessionErrorProvider({ children }: SessionErrorProviderProps) {
  const { locale } = useRouter();
  const { data: session } = useSession();


  return <>{children}</>;
}
