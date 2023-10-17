import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Loader2 className="h-6 w-6 animate-spin" />
    </main>
  )
}
