/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');
const { withAxiom } = require('next-axiom');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { i18n } = require('./next-i18next.config');

const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig = withAxiom(
  withBundleAnalyzer({
    reactStrictMode: true,
    swcMinify: true,
    i18n,
    // env: {
    //   PASSWORD_PROTECT: IS_PROTECTED,
    // },
    images: {
      domains: ['lh3.googleusercontent.com', 'i.scdn.co'],
    },
    sentry: {
      widenClientFileUpload: true,
      hideSourceMaps: true,
      automaticVercelMonitors: false,
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: securityHeaders,
        },
        {
          source: '/.well-known/apple-developer-merchantid-domain-association',
          headers: [{ key: 'Content-Type', value: 'application/json' }],
        },
      ];
    },
  })
);

const sentryWebpackPluginOptions = {
  org: 'reproductible-socket-hang-up',
  project: 'eproductible-socket-hang-up',
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
