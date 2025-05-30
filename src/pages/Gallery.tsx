
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface GeneratedImage {
  id: number;
  url: string;
  timestamp: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('generatedImages') || '[]');
    setImages(storedImages);
  }, []);

  const downloadImage = (imageUrl: string, id: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `meme-beanz-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-6">
        <div className="container mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10"
          >
            ← Back to Home
          </Button>
          <h1 className="text-2xl font-bold">Gallery</h1>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/generator')}
            className="text-white hover:bg-white/10 border border-white/20"
          >
            Generator
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Generated Meme Beanz Gallery
            </h2>
            <p className="text-gray-300 text-lg">
              Explore all the amazing pill capsules created by our community
            </p>
          </div>

          {images.length === 0 ? (
            <Card className="bg-black/40 backdrop-blur-sm border-white/10 p-12 text-center">
              <div className="text-gray-400 mb-6">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-2">No images generated yet</h3>
                <p className="text-gray-500">Start creating your first Meme Beanz!</p>
              </div>
              <Button 
                onClick={() => navigate('/generator')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-3"
              >
                Create Your First Beanz
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image) => (
                <Card key={image.id} className="bg-black/40 backdrop-blur-sm border-white/10 p-4 hover:border-purple-400/30 transition-all duration-300 group">
                  <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-white">
                    <img 
                      src={image.url} 
                      alt={`Generated Meme Beanz ${image.id}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {new Date(image.timestamp).toLocaleDateString()}
                    </span>
                    <Button 
                      size="sm"
                      onClick={() => downloadImage(image.url, image.id)}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0"
                    >
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Gallery;
