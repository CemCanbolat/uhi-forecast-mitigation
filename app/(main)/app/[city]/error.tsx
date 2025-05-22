'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="bg-gray-900 flex flex-col h-full w-full">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white text-center p-8">
          <h2 className="text-xl font-bold mb-4">Failed to load city data</h2>
          <p className="mb-4 text-gray-400">{error.message}</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
