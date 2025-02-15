import './globals.css'

export async function generateMetadata() {
  return {
    title: 'v0 App',
    description: 'Created with v0',
    generator: 'v0.dev',
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
