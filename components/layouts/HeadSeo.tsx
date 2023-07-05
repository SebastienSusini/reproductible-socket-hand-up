/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Head from "next/head";
import { useTranslation } from "next-i18next";

import { clientBaseUrl, imgixUrl } from "utils/constants/uris";

const STAGING = process.env.NEXT_PUBLIC_NODE_ENV === "staging";

interface Seotags {
  title?: string;
  description?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
  alternateFrUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  thumb?: string;
}

function HeadSeo({
  title,
  description,
  noIndex,
  canonicalUrl,
  alternateFrUrl,
  imageUrl,
  videoUrl,
  thumb,
}: Seotags) {
  const { t } = useTranslation("common");

  return (
    <Head>
      {/* Basic */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
      />

      <title>Socket Hang Up</title>
      <meta
        name="description"
        content={description ?? t("meta.home.description")}
      />
      <meta name="image" />
      {(noIndex || STAGING) && <meta name="robots" content="noindex,follow" />}

      {!noIndex && (
        <>
          {/* Canonical Url */}
          <link rel="canonical" href={canonicalUrl} />
          {/* Alternate Urls */}
          <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
          <link rel="alternate" hrefLang="fr" href={alternateFrUrl} />
        </>
      )}

      {/* Facebook */}
      <meta property="og:site_name" content="Socket Hang Up" />
      <meta property="og:type" content={videoUrl ? "video.other" : "website"} />
      <meta
        property="og:title"
        content={title ? `${title} | Socket Hang Up` : "Socket Hang Up"}
      />
      <meta
        property="og:description"
        content={description ?? t("meta.home.description")}
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta
        property="og:image"
        content={
          imageUrl
            ? `${imgixUrl}/${imageUrl}`
            : thumb
            ? `${imgixUrl}/Socket Hang Up-video-thumbs/${thumb}`
            : `${clientBaseUrl}/assets/banners/default.png`
        }
      />
      <meta
        property="og:image:secure_url"
        content={
          imageUrl
            ? `${imgixUrl}/${imageUrl}`
            : thumb
            ? `${imgixUrl}/Socket Hang Up-video-thumbs/${thumb}`
            : `${clientBaseUrl}/assets/banners/default.png`
        }
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:title" content={"Socket Hang Up"} />
      <meta
        name="twitter:description"
        content={description ?? t("meta.home.description")}
      />
      <meta
        name="twitter:card"
        content={imageUrl || thumb ? "summary" : "summary_large_image"}
        key="card"
      />
      <meta
        name="twitter:image"
        content={
          imageUrl
            ? `${imgixUrl}/${imageUrl}`
            : thumb
            ? `${imgixUrl}/Socket Hang Up-video-thumbs/${thumb}`
            : `${clientBaseUrl}/assets/banners/default.png`
        }
      />

      {videoUrl && (
        <>
          {/* Facebook */}
          <meta property="og:video" content={videoUrl} />
          <meta property="og:video:secure_url" content={videoUrl} />
          <meta property="og:video:type" content="video/mp4" />
          <meta property="og:video:width" content="480" />
          <meta property="og:video:height" content="480" />

          {/* Twitter */}
          <meta name="twitter:card" content="player" key="card" />
          <meta name="twitter:player" content={videoUrl} />
          <meta name="twitter:player:width" content="480" />
          <meta name="twitter:player:height" content="480" />
        </>
      )}
    </Head>
  );
}

export default HeadSeo;
