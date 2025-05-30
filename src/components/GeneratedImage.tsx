
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GeneratedImageProps {
  imageUrl: string | null;
  isGenerating: boolean;
}

const GeneratedImage = ({ imageUrl, isGenerating }: GeneratedImageProps) => {
  const downloadImage = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `beybladez-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isGenerating) {
    return (
      <Card className="bg-gray-800/50 border-gray-600 p-8 text-center">
        <div className="space-y-4">
          <div className="animate-spin text-4xl">⚡</div>
          <div>
            <p className="text-gray-300 font-medium">Generating your Beybladez...</p>
            <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!imageUrl) {
    return (
      <Card className="bg-gray-800/50 border-gray-600 p-8 text-center">
        <div className="text-gray-400">
          <div className="text-4xl mb-4">🎯</div>
          <p className="text-gray-400">Your personalized <strong>beybladez</strong> will appear here</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/50 border-gray-600 p-4">
      <div className="space-y-4">
        <div className="aspect-square rounded-lg overflow-hidden bg-white">
          <img 
            src={imageUrl} 
            alt="Generated beybladez" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={downloadImage}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0"
          >
            Download
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GeneratedImage;
