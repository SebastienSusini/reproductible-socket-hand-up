import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";

import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { ModalProvider } from "../context/modal/modalProvider";

import { chains, wagmiClient } from "../utils/wagmi";

import ErrorBoundary from "@/components/layouts/ErrorBoundary";
import Layout from "@/components/layouts/Layout";
import SessionErrorProvider from "@/components/layouts/SessionErrorProvider";

import nextI18NextConfig from "../next-i18next.config";

import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-spring-bottom-sheet/dist/style.css";

// Wait support for Next.js 13
// export { reportWebVitals } from 'next-axiom';

// trying to fix application error on production unregistering service worker
// to remove in the future
const unregister = async () => {
  if ("serviceWorker" in navigator) {
    await caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName);
      });
    });
    await navigator.serviceWorker
      .getRegistrations()
      .then(async (registrations) => {
        registrations.forEach(async (registration) => {
          await registration.unregister();
        });
      });
    indexedDB.deleteDatabase("workbox-expiration");
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    unregister();
  }, []);

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />

      <SessionProvider session={pageProps?.session}>
        <SessionErrorProvider>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
              chains={chains}
              modalSize="compact"
              theme={lightTheme({
                accentColor: "#636D88",
                accentColorForeground: "white",
                borderRadius: "small",
                fontStack: "system",
                overlayBlur: "small",
              })}
            >
              <ModalProvider>
                <ErrorBoundary>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ErrorBoundary>
              </ModalProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </SessionErrorProvider>
      </SessionProvider>
    </>
  );
}

// export default process.env.PASSWORD_PROTECT
//   ? withPasswordProtect(appWithTranslation(MyApp, nextI18NextConfig), passwordProtectConfig)
//   : appWithTranslation(MyApp, nextI18NextConfig);

export default appWithTranslation(MyApp, nextI18NextConfig);
