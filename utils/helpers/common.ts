import { NextRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";

export const makeCallbackUrl = (
    router: NextRouter
): string | ParsedUrlQueryInput | null | undefined => {
    const dynamicPath = /[a-zA-Z]/;
  
    if (router.pathname === '/auth/signup' || router.pathname === '/auth/login') {
      if (router.query?.callbackUrl) {
        return {
          callbackUrl: router.query.callbackUrl,
        };
      }
      return null;
    }
    if (dynamicPath.test(router.pathname)) {
      return {
        callbackUrl: router.locale === 'fr' ? `/${router.locale}${router.asPath}` : router.asPath,
      };
    }
    return {
      callbackUrl: router.locale === 'fr' ? `/${router.locale}${router.pathname}` : router.pathname,
    };
};