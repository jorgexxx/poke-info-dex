export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f6f8fc] to-[#e0e7ef] text-gray-900 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl p-0 shadow-lg flex flex-col" style={{height: "90vh"}}>
        <header className="sticky top-0 z-10 bg-white rounded-t-xl p-6 pb-2 shadow-sm">
          <h1 className="text-4xl font-bold">Pokémon List</h1>
        </header>
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-lg text-gray-600">Loading Pokémon...</p>
            <p className="text-sm text-gray-500 mt-2">Catching them all for you!</p>
          </div>
        </div>
      </div>
    </main>
  );
}