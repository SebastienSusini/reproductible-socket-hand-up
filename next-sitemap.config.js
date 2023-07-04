/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "sockethangup",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  trailingSlash: false,
  alternateRefs: [
    {
      href: `${"i dont know"}/fr`,
      hreflang: "fr",
    },
  ],
  exclude: ["/404", "/500", "/server-sitemap.xml"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "",
      },
    ],
    additionalSitemaps: [`sockethangup/server-sitemap.xml`],
  },
};
