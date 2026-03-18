export default function Loading() {
  return (
    <div className="min-h-screen bg-dgc-dark-blue-1 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-dgc-blue-1/30 border-t-dgc-blue-1 rounded-full animate-spin"></div>
        <p className="text-white/60 text-sm">Loading...</p>
      </div>
    </div>
  )
}
