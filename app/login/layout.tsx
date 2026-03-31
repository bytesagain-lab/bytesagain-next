import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | BytesAgain',
  description: 'Sign in to BytesAgain to access personalized AI skill recommendations.',
  robots: { index: false, follow: true },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
