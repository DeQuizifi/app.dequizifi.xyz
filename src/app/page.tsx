export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, var(--color-primary-bg, #e0e7ff) 0%, var(--color-secondary-bg, #f3e8ff) 100%)',
      }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text mb-4 text-center drop-shadow-lg"
          style={{
            backgroundImage:
              'linear-gradient(90deg, var(--color-primary, #6366f1), var(--color-secondary, #a21caf))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Welcome to DeQuizifi
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 text-center">
          Start building your next-gen quiz experience!
        </p>
        <a
          href="/general/home"
          className="inline-block px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:scale-105 hover:shadow-xl transition-all duration-200"
          style={{
            background: 'linear-gradient(90deg, var(--color-primary, #6366f1), var(--color-secondary, #a21caf))',
          }}
        >
          Go to Dashboard
        </a>
      </div>
    </main>
  );
}
