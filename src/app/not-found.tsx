import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-dgc-blue-1">404</h1>
        <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          The page you are looking for could not be found. It may have been moved or removed.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-dgc-blue-1 text-white font-semibold rounded-xl hover:bg-dgc-blue-2 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
