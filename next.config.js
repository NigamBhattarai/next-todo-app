/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
    serverActions: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        "utf-8-validate": "commonjs utf-8-validate",
        bufferutil: "commonjs bufferutil",
        "supports-color": "commonjs supports-color",
        kerberos: "commonjs kerberos",
        "@mongodb-js/zstd": "commonjs @mongodb-js/zstd",
        snappy: "commonjs snappy",
        socks: "commonjs socks",
        aws4: "commonjs aws4",
        "mongodb-client-encryption": "commonjs mongodb-client-encryption",
        "@aws-sdk/credential-providers":
          "commonjs @aws-sdk/credential-providers",
        "gcp-metadata": "commonjs gcp-metadata",
      });
    }
    return config;
  },
};

module.exports = nextConfig;
