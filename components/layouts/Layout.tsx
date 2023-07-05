import { useCallback, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useIntercom } from "react-use-intercom";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { log } from "next-axiom";
import NextNProgress from "nextjs-progressbar";

import clsx from "clsx";

import TapBar from "../TapBar";

import Consent from "./Consent";
import Web3Errors from "./Web3Errors";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <>
      {/* Trick to get bg on IOS mobile device */}
      <div
        id="bg-mobile"
        className={clsx(`safari-fix fixed top-0 -z-10 h-screen w-full`, {
          "bg-[#1A1B23]": true,
          "bg-body-texture-sm bg-no-repeat xs:bg-cover md:hidden": !true,
        })}
      />
      <NextNProgress
        color={"#93B0FF"}
        height={3}
        options={{ showSpinner: false }}
        showOnShallow={false}
      />

      {/* <Header shortCurrentUser={shortCurrentUser} hasNotifications={hasNotif?.is_some_unread} /> */}
      <main>{children}</main>
      <TapBar
        shortCurrentUser={null}
        isArtist={false}
        hasNotifications={false}
      />

      <Consent />
      <Web3Errors />
    </>
  );
};

export default Layout;
