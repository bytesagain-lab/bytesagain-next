import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: 'https://bytesagain.com/mcp' },
}

export default function MCPLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
