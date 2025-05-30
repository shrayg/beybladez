
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/ImageUpload";
import GeneratedImage from "@/components/GeneratedImage";
import OpenAI from "openai";


const Generator = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [appImage, setAppImage] = useState<any[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setGeneratedImage(null);
    setDone(false);
    
    // Convert the uploaded image to the format expected by your script
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        setAppImage([{ blob }]);
      });
  };

  const generateImage = async () => {
    if (!appImage || appImage.length === 0) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_API_KEY,
        dangerouslyAllowBrowser: true
      });

      console.log("past key");
 
      const prompt = `Use the uploaded image as the content of the top 80% of a vertical pill-shaped capsule, perfectly centered in a 1:1 square canvas. Render the bottom 20% of the capsule as a smooth, shiny silver metallic surface with subtle specular highlights, gentle gradient shading, and a faint reflection. Place the capsule on a uniform white background. The entire illustration should appear as a realistic artwork: realistic reflections, metal light diffusion, hard edges, realistic shadows, diffuse lighting. Ensure the uploaded image's proportions and details are preserved, seamlessly integrated into the pill's upper half. Finally, add a very soft drop shadow beneath the capsule to ground it on the canvas.`;

      // Use the first image from appImage array
      const imageObj = appImage[0];

      // Convert blob to base64
      const toBase64 = (blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            // Extract just the base64 part (after the comma)
            const base64 = (reader.result as string).split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };

      let base64Image = null;
      if (imageObj.blob) {
        base64Image = await toBase64(imageObj.blob);
      } else {
        toast({
          title: "Error",
          description: "Could not extract image data from uploaded file.",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }

      const response = await openai.responses.create({
        model: "gpt-4.1",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: prompt },
              {
                type: "input_image",
                image_url: `data:image/png;base64,${base64Image}`,
                detail: "auto"

              },
            ],
          },
        ],
        tools: [{type: "image_generation"}],
      });

      const imageData = response.output
        .filter((output) => output.type === "image_generation_call")
        .map((output) => output.result);

      // Assuming the generated image is returned as a base64 string in the message content:
    const generatedImageBase64 = imageData[0]; //response.choices[0].message.content.trim();
    if (generatedImageBase64) {
      setGeneratedImage(`data:image/png;base64,${generatedImageBase64}`);
      toast({
        title: "Image generated successfully!",
        description: "Your generated image is ready.",
      });
    } else {
      toast({
        title: "Generation failed",
        description: "Failed to generate image.",
        variant: "destructive",
      });
    }  
  } catch (error) {
    console.error("Error generating image:", error);
    toast({
      title: "Generation failed",
      description: "An error occurred while generating the image.",
      variant: "destructive",
    });
  } finally {
    setIsGenerating(false);
    setDone(true);
  }
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
          <h1 className="text-2xl font-bold">Mighty Beanz Generator</h1>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/gallery')}
            className="text-white hover:bg-white/10 border border-white/20"
          >
            Gallery
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Create Your Meme Beanz
            </h2>
            <p className="text-gray-300 text-lg">
              Upload any image and transform it into a pill capsule masterpiece
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="bg-black/40 backdrop-blur-sm border-white/10 p-6">
              <h3 className="text-xl font-semibold mb-6 text-white">Upload Image</h3>
              <ImageUpload onImageUpload={handleImageUpload} />
              
              <Button 
                onClick={generateImage}
                disabled={!uploadedImage || isGenerating}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 py-3 text-lg font-semibold disabled:opacity-50"
              >
                {isGenerating ? "Generating..." : "Generate Meme Beanz"}
              </Button>
            </Card>

            {/* Result Section */}
            <Card className="bg-black/40 backdrop-blur-sm border-white/10 p-6">
              <h3 className="text-xl font-semibold mb-6 text-white">Generated Result</h3>
              <GeneratedImage 
                imageUrl={generatedImage} 
                isGenerating={isGenerating}
              />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Generator;
