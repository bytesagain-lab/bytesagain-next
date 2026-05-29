import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: 'https://bytesagain.com/install' },
}

export default function InstallLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
