import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    if (process.env.NODE_ENV === "development") {
      return [];
    }
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://otsecret.xyz",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"].join(", "),
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value: "microphone=(), camera=()",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=15552000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

// we only need to use the utility during development so we can check NODE_ENV
// (note: this check is recommended but completely optional)
if (process.env.NODE_ENV === "development") {
  // we simply need to call the utility
  setupDevPlatform();
}
