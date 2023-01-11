/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["rb.gy", "cdn.sanity.io", "lh3.googleusercontent.com"],
  },

  
  swcMinify: true,  
  // Adding policies:
  async headers() {
    return [
      {
          source: '/user',
          headers: [
            {
              key: 'Content-Security-Policy',
              value:
                "default-src 'self' 'http://blog.logrocket.com'; image-src 'https://unsplash.com'; script-src 'self' https://www.google-analytics.com; font-src 'self' 'https://fonts.googleapis.com'",
            }
          ]
        },
       {
          source: '/posts',
          headers: [
            {
              key: 'Content-Security-Policy',
              value:
                "default-src 'self'",
            }
          ]
        },
      ];
  },

}

module.exports = nextConfig
