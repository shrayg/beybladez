
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-silver-400">Mighty Beanz</h1>
          <nav className="flex gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/generator')}
              className="text-silver-300 hover:bg-gray-900 border border-gray-700 hover:border-silver-400"
            >
              Generator
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/gallery')}
              className="text-silver-300 hover:bg-gray-900 border border-gray-700 hover:border-silver-400"
            >
              Gallery
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-gray-400 via-silver-300 to-gray-400 bg-clip-text text-transparent">
            Mighty Beanz Image Generator
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">
            Upload any image and press generate and get your Meme Beanz
          </p>

          {/* Contract Info */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Official Contract Address (CA):</h3>
            <p className="text-silver-300 font-mono text-sm md:text-base break-all bg-black/50 p-4 rounded-lg border border-gray-600">
              S4kYvBGEP2AcpC2Nw4BjwhK9oXq7iXrHupwkgmQU7f5
            </p>
          </div>

          {/* Social Links */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-300 mb-6">Official Twitter:</h3>
            <Button 
              asChild
              className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-silver-300 border border-gray-600 px-8 py-3 text-lg"
            >
              <a 
                href="https://x.com/i/communities/1927305352602640601" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <span>Twitter | X</span>
              </a>
            </Button>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={() => navigate('/generator')}
            className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-silver-200 border border-gray-500 px-12 py-4 text-xl font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Generating
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 left-6 text-sm text-gray-500">
        <p>Refresh if there are any issues.</p>
      </footer>
    </div>
  );
};

export default Index;
