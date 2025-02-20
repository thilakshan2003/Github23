import { promises as fs } from "fs"
import path from "path"
import { FileText } from "lucide-react"

async function getTextFiles() {
  const dataDirectory = path.join(process.cwd(), "data")

  try {
    // Create data directory if it doesn't exist
    await fs.mkdir(dataDirectory, { recursive: true })

    const filenames = await fs.readdir(dataDirectory)
    const textFiles = await Promise.all(
      filenames
        .filter((filename) => filename.endsWith(".txt"))
        .map(async (filename) => {
          const filePath = path.join(dataDirectory, filename)
          const content = await fs.readFile(filePath, "utf8")
          return {
            filename,
            content,
          }
        }),
    )
    return textFiles
  } catch (error) {
    console.error("Error reading files:", error)
    // Return empty array but create a default file if none exists
    try {
      const defaultContent =
        "Welcome to Version Control!\n\nThis is your first text file. Add more .txt files to see them appear here."
      await fs.writeFile(path.join(dataDirectory, "welcome.txt"), defaultContent)
      return [
        {
          filename: "welcome.txt",
          content: defaultContent,
        },
      ]
    } catch {
      return []
    }
  }
}

export default async function Page() {
  const files = await getTextFiles()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 animate-gradient-x" />

      {/* Animated patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.3),rgba(0,0,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.3),rgba(0,0,255,0))]" />
      </div>

      {/* Animated waves */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 animate-wave-slow">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path className="fill-white/10" d="M0,50 Q25,45 50,50 T100,50 L100,100 L0,100 Z" />
          </svg>
        </div>
        <div className="absolute inset-0 animate-wave-fast">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path className="fill-white/10" d="M0,50 Q25,55 50,50 T100,50 L100,100 L0,100 Z" />
          </svg>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-overlay filter blur-xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              background: `rgba(147, 197, 253, ${Math.random() * 0.3})`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 relative animate-in fade-in slide-in-from-top duration-700 text-center drop-shadow-lg">
        Let&apos;s Learn Version Control
      </h1>

      <div className="max-w-2xl w-full animate-in fade-in duration-700 slide-in-from-bottom-4 relative">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-6 hover:shadow-blue-500/20 transition-shadow duration-300 h-[600px]">
          <div className="h-full overflow-y-auto pr-2 space-y-6 scrollbar-thin">
            {files.length > 0 ? (
              files.map((file) => (
                <article key={file.filename} className="group">
                  <div className="sticky top-0 bg-white/80 backdrop-blur-sm py-2 mb-3 flex items-center gap-2 text-gray-600 border-b">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <h2 className="text-sm font-medium">{file.filename}</h2>
                  </div>
                  <div className="whitespace-pre-wrap text-gray-600 pl-6">{file.content}</div>
                </article>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No text files found. Add some .txt files to the data directory to get started.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

