'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-dgc-dark-blue-1 flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">Something went wrong</h2>
        <p className="text-white/70 max-w-md mx-auto">
          An unexpected error occurred. Please try again or contact us if the problem persists.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-dgc-blue-1 text-white font-semibold rounded-xl hover:bg-dgc-blue-2 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
