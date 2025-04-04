import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ghibli Image Transformer",
  description: "Transform your photos into beautiful Ghibli-style artwork",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* This script handles GitHub Pages SPA routing */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // This script checks to see if a redirect is present in the query string,
            // converts it back into the correct URL and adds it to the
            // browser's history using window.history.replaceState(...),
            // which won't cause the browser to attempt to load the new URL.
            // When the single page app is loaded further down in this file,
            // the correct URL will be waiting in the browser's history for
            // the single page app to route accordingly.
            (function(l) {
              if (l.search[1] === '/' ) {
                var decoded = l.search.slice(1).split('&').map(function(s) { 
                  return s.replace(/~and~/g, '&')
                }).join('?');
                window.history.replaceState(null, null,
                    l.pathname.slice(0, -1) + decoded + l.hash
                );
              }
            }(window.location))
          `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

