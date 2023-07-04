import RainbowConnect from "@/components/buttons/RainbowConnect";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetServerSideProps } from "next";
import HeadSeo from "@/components/layouts/HeadSeo";

/** Add your relevant code here for the issue to reproduce */
export default function Home() {
  return (
    <>
      <HeadSeo title="Not found" noIndex />
      <RainbowConnect />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { locale } = ctx;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
