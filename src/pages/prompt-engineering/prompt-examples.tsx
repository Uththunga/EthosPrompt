import React from 'react';
import { Card } from '../../components/ui/Card';
import { Copy, CheckCircle2, Circle, Sparkles, BrainCircuit, Code, ArrowRight, Play, Lightbulb, ClipboardCopy, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';


const PromptExamples: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000); // Reset after 2 seconds
  };

  const examples = [
    {
      title: "1. Philosophical & Ethical Exploration",
      icon: <Sparkles className="text-purple-400" size={24} />,
      description: "Explore complex ideas about the future of humanity and technology.",
      template: `Act as a [ROLE] and explore [CONCEPT].\nConsider: [ASPECTS_TO_CONSIDER].\nPresent the output as [FORMAT].`,
      example: `Act as a futurist philosopher and brainstorm 5 key principles for a 'Human-AI Collaboration Bill of Rights'.\nConsider: Ethics, creativity, autonomy, and shared responsibility.\nPresent the output as a numbered list with a brief explanation for each principle.`,
    },
    {
      title: "2. Creative Writing & Narrative Craft",
      icon: <BrainCircuit className="text-purple-400" size={24} />,
      description: "Craft compelling stories and dialogues exploring complex themes.",
      template: `Write a short story about [SCENARIO].\nCharacters: [CHARACTERS].\nSetting: [SETTING].\nTheme: [THEME].`,
      example: `Write a short, emotional scene between an elderly artist who is losing their memory and their AI companion who helps them preserve their life's work.\nCharacters: An 80-year-old painter named Elias and an AI named 'Kai'.\nSetting: A dusty, sunlit art studio.\nTheme: Memory, legacy, and the nature of creativity.`,
    },
    {
      title: "3. Themed Web & UI Design",
      icon: <Code className="text-purple-400" size={24} />,
      description: "Generate web elements that visually represent complex themes.",
      template: `Generate HTML and CSS for a [ELEMENT] that represents [THEME].\nStyle should be: [STYLE_DETAILS].`,
      example: `Generate HTML and CSS for a website hero section about 'Harmonious Human-AI Coexistence'.\nStyle should be futuristic but warm, blending organic curves with clean, geometric lines. Include a title and a short, inspiring tagline.`,
    }
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back to Guide Link */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link to="/prompt-engineering/basics" className="inline-flex items-center text-purple-300 hover:text-purple-100 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Prompt Engineering Guide
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            Welcome to the{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Prompt Playground
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            This is your space to experiment. Copy our example prompts, paste them into your favorite AI tool, and see the magic happen!
          </p>
        </div>

        {/* How to Use Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
            <Play size={24} className="text-purple-400 mr-3" />
            How to Use This Playground
          </h2>
          <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
            <div className="p-6">
              {/* 3-Step Guide */}
              <div className="grid md:grid-cols-3 gap-6 text-gray-300 mb-8">
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <ClipboardCopy size={20} className="text-purple-300"/>
                    <h3 className="text-lg font-semibold text-white">1. Copy a Prompt</h3>
                  </div>
                  <p>Click the copy icon on any example.</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <ArrowRight size={20} className="text-purple-300"/>
                    <h3 className="text-lg font-semibold text-white">2. Paste in Your AI</h3>
                  </div>
                  <p>Paste into your favorite AI tool below.</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Sparkles size={20} className="text-purple-300"/>
                    <h3 className="text-lg font-semibold text-white">3. Experiment</h3>
                  </div>
                  <p>Tweak the prompt and see what you get!</p>
                </div>
              </div>

              {/* Recommended AI Platforms */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Recommended AI Platforms</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* ChatGPT */}
                  <div className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-purple-500">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-purple-400">
                          <path d="M11.9998 0C5.373 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.388C8.806 23.5 9.025 23.125 9.025 22.813C9.025 22.525 9.015 21.6 9.01 20.359C5.672 21.07 4.966 18.9 4.966 18.9C4.421 17.6 3.633 17.2 3.633 17.2C2.546 16.4 3.717 16.4 3.717 16.4C4.922 16.5 5.556 17.6 5.556 17.6C6.625 19.5 8.364 19 9.05 18.7C9.158 17.9 9.467 17.4 9.81 17.1C7.145 16.8 4.343 15.8 4.343 11.5C4.343 10.4 4.812 9.5 5.579 8.8C5.455 8.5 5.045 7.3 5.696 5.6C5.696 5.6 6.704 5.3 8.997 7.1C10.269 6.7 11.65 6.5 13.03 6.5C14.41 6.5 15.79 6.7 17.063 7.1C19.356 5.3 20.364 5.6 20.364 5.6C21.015 7.3 20.605 8.5 20.481 8.8C21.248 9.5 21.717 10.4 21.717 11.5C21.717 15.8 18.915 16.8 16.25 17.1C16.673 17.5 17.04 18.2 17.04 19.3C17.04 20.9 17.03 22.2 17.03 22.8C17.03 23.1 17.24 23.5 17.84 23.4C22.605 21.8 26 17.3 26 12C26 5.373 20.627 0 14 0H12H11.9998Z" />
                        </svg>
                      </div>
                      <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="font-medium text-purple-300 hover:underline">ChatGPT (OpenAI)</a>
                    </div>
                  </div>
                  {/* Claude */}
                  <div className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-blue-400">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-blue-400">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                          <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                        </svg>
                      </div>
                      <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-300 hover:underline">Claude (Anthropic)</a>
                    </div>
                  </div>
                  {/* Gemini */}
                  <div className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-yellow-400">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-yellow-400">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                          <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                        </svg>
                      </div>
                      <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="font-medium text-yellow-300 hover:underline">Gemini (Google)</a>
                    </div>
                  </div>
                  {/* Mistral */}
                  <div className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-orange-400">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-orange-400">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                          <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                        </svg>
                      </div>
                      <a href="https://mistral.ai" target="_blank" rel="noopener noreferrer" className="font-medium text-orange-300 hover:underline">Mistral AI</a>
                    </div>
                  </div>
                  {/* Llama */}
                  <div className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-red-400">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-red-400">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                          <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                        </svg>
                      </div>
                      <a href="https://ai.meta.com/llama" target="_blank" rel="noopener noreferrer" className="font-medium text-red-300 hover:underline">Llama (Meta)</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Prompt Examples Section */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
            <Sparkles size={24} className="text-purple-400 mr-3" />
            Prompt Examples & Templates
          </h2>
          <div className="space-y-8">
            {examples.map((example, index) => (
              <Card key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {example.icon}
                    <h2 className="text-2xl font-semibold text-white">{example.title}</h2>
                  </div>
                  <p className="text-gray-300 mb-6">{example.description}</p>

                  {/* Template */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-purple-400 mb-3">Template</h3>
                    <div className="relative">
                      <pre className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 text-gray-300 font-mono text-sm whitespace-pre-wrap">
                        {example.template}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="absolute top-2 right-2 text-gray-400 hover:text-purple-400"
                        onClick={() => copyToClipboard(example.template)}
                      >
                        {copied === example.template ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                      </Button>
                    </div>
                  </div>

                  {/* Example */}
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-3">Example Usage</h3>
                    <div className="relative">
                      <pre className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 text-gray-300 font-mono text-sm whitespace-pre-wrap">
                        {example.example}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="absolute top-2 right-2 text-gray-400 hover:text-purple-400"
                        onClick={() => copyToClipboard(example.example)}
                      >
                        {copied === example.example ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Tips Section */}
            <Card className="bg-purple-900/20 border-purple-500/30 backdrop-blur-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="text-purple-400" size={20} />
                  Pro Tips
                </h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Circle size={6} className="text-purple-400 mt-2 flex-shrink-0" />
                    Start simple and add complexity only when needed.
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle size={6} className="text-purple-400 mt-2 flex-shrink-0" />
                    Be specific about your requirements and constraints.
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle size={6} className="text-purple-400 mt-2 flex-shrink-0" />
                    Include relevant context that might affect the output.
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle size={6} className="text-purple-400 mt-2 flex-shrink-0" />
                    Use clear, consistent formatting for complex requests.
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PromptExamples;
