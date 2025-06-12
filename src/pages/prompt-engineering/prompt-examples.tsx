import React from 'react';
import { Card } from '../../components/ui/Card';
import { Copy, CheckCircle2, Circle, Sparkles, BrainCircuit, Code, Lightbulb, ClipboardCopy, ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/Button';


const PromptExamples: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const [copied, setCopied] = React.useState<string | null>(null);
  const [isHowToUseOpen, setIsHowToUseOpen] = React.useState(false);

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
      description: "Generate web elements that visually represent the core mission of EthosPrompt.",
      template: `Generate HTML and CSS for a [ELEMENT] that represents [THEME].\nStyle should be: [STYLE_DETAILS].`,
      example: `Generate HTML for a website page for EthosPrompt, a leader in AI-driven solutions. The theme is 'Pioneering AI-Human Synergy,' showcasing EthosPrompt's crucial role in this technological evolution.\nStyle should be futuristic yet inviting, blending organic shapes with precise, clean lines. Include a compelling title, and an inspiring tagline about the company's transformative impact.`, 
    }
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            Welcome to the{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Prompt Playground
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300">
            This is your space to experiment. Copy our example prompts, paste them into your favorite AI tool, and see the magic happen!
          </p>
        </div>

        {/* How to Use Section (Collapsible) */}
        <section className="max-w-4xl mx-auto mb-16">
          <div 
            onClick={() => setIsHowToUseOpen(!isHowToUseOpen)}
            className="cursor-pointer text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-4 flex items-center justify-between w-full p-3 md:p-2 rounded-lg hover:bg-gray-800/50 active:bg-gray-800/70 transition-colors"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setIsHowToUseOpen(!isHowToUseOpen)}
            aria-expanded={isHowToUseOpen}
            aria-controls="how-to-use-content"
          >
            <div className="flex items-center">
              <Lightbulb size={20} className="text-purple-400 mr-2 md:mr-3 flex-shrink-0" />
              <span className="text-base sm:text-lg">How to Use These Examples</span>
            </div>
            <ChevronDown
              size={20}
              className={`text-purple-400 transition-transform duration-300 flex-shrink-0 ${isHowToUseOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </div>

          <div 
            id="how-to-use-content"
            className={`transition-all duration-300 ease-in-out overflow-hidden ${isHowToUseOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
            aria-hidden={!isHowToUseOpen}
          >
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 mt-2 md:mt-4">
              <div className="p-4 sm:p-6">
                <p className="text-gray-300 text-sm sm:text-base text-center mb-6 md:mb-8">This playground is a collection of curated prompts. There's no AI here—instead, you can copy these examples and use them with your favorite large language model (LLM) to see how they work.</p>
                {/* 3-Step Guide */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-gray-300 mb-6 md:mb-8">
                  <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg border border-gray-700/50 text-center">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                      <ClipboardCopy size={18} className="text-purple-300 flex-shrink-0"/>
                      <h3 className="text-base sm:text-lg font-semibold text-white whitespace-nowrap">1. Copy Example Prompt</h3>
                    </div>
                    <p>Click the copy icon on any template or example.</p>
                  </div>
                  <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg border border-gray-700/50 text-center">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                    <BrainCircuit size={18} className="text-purple-300 flex-shrink-0"/>
                    <h3 className="text-base sm:text-lg font-semibold text-white whitespace-nowrap">2. Use in an AI Tool</h3>
                  </div>
                    <p>Paste the prompt into one of the AI platforms listed below.</p>
                  </div>
                  <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg border border-gray-700/50 text-center">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                    <Sparkles size={18} className="text-purple-300 flex-shrink-0"/>
                    <h3 className="text-base sm:text-lg font-semibold text-white whitespace-nowrap">3. Experiment</h3>
                  </div>
                    <p>Modify the prompt to see how the AI's response changes.</p>
                  </div>
                </div>

                {/* Recommended AI Platforms */}
                <div className="mt-6">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 text-center">Popular AI Chat Tools</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {/* ChatGPT */}
                    <div className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-purple-500 hover:bg-gray-800/70 transition-colors">
                      <div className="flex items-center gap-2">
                        <img src="/EthosPrompt/images/ai-logos/chatgpt-icon.png" alt="ChatGPT logo" className="w-5 h-5 flex-shrink-0" />
                        <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="font-medium text-purple-300 hover:underline text-sm sm:text-base break-words">ChatGPT (OpenAI)</a>
                      </div>
                    </div>
                    {/* Claude */}
                    <div className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-blue-400 hover:bg-gray-800/70 transition-colors">
                      <div className="flex items-center gap-2">
                        <img src="/EthosPrompt/images/ai-logos/claude-ai-icon.png" alt="Claude AI logo" className="w-5 h-5 flex-shrink-0" />
                        <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-300 hover:underline text-sm sm:text-base break-words">Claude (Anthropic)</a>
                      </div>
                    </div>
                    {/* Gemini */}
                    <div className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-yellow-400 hover:bg-gray-800/70 transition-colors">
                      <div className="flex items-center gap-2">
                        <img src="/EthosPrompt/images/ai-logos/google-gemini-icon.png" alt="Google Gemini logo" className="w-5 h-5 flex-shrink-0" />
                        <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="font-medium text-yellow-300 hover:underline text-sm sm:text-base break-words">Gemini (Google)</a>
                      </div>
                    </div>
                    {/* Mistral */}
                    <div className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-orange-400 hover:bg-gray-800/70 transition-colors">
                      <div className="flex items-center gap-2">
                        <img src="/EthosPrompt/images/ai-logos/mistral-ai-icon.png" alt="Mistral AI logo" className="w-5 h-5 flex-shrink-0" />
                        <a href="https://mistral.ai" target="_blank" rel="noopener noreferrer" className="font-medium text-orange-300 hover:underline text-sm sm:text-base break-words">Mistral AI</a>
                      </div>
                    </div>
                    {/* Ollama */}
                    <div className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-red-400 hover:bg-gray-800/70 transition-colors">
                      <div className="flex items-center gap-2">
                        <img src="/EthosPrompt/images/ai-logos/Ollama icon.png" alt="Ollama logo" className="w-5 h-5 flex-shrink-0" />
                        <a href="https://ollama.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-red-300 hover:underline text-sm sm:text-base break-words">Ollama</a>
                      </div>
                    </div>
                    {/* Perplexity AI */}
                    <div className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-green-400 hover:bg-gray-800/70 transition-colors">
                      <div className="flex items-center gap-2">
                        <img src="/EthosPrompt/images/ai-logos/perplexity-ai-icon.png" alt="Perplexity AI logo" className="w-5 h-5 flex-shrink-0" />
                        <a href="https://www.perplexity.ai/" target="_blank" rel="noopener noreferrer" className="font-medium text-green-300 hover:underline text-sm sm:text-base break-words">Perplexity AI</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Prompt Examples Section */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
            <Sparkles size={24} className="text-purple-400 mr-3" />
            Prompt Examples & Templates
          </h2>
          <div className="space-y-8">
            {examples.map((example, index) => (
              <Card key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {example.icon}
                    <h2 className="text-lg sm:text-xl font-semibold text-white">{example.title}</h2>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base mb-6">{example.description}</p>

                  {/* Template */}
                  <div className="mb-6">
                    <h3 className="text-base sm:text-lg font-medium text-purple-400 mb-3">Template</h3>
                    <div className="relative">
                      <pre className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-3 sm:p-4 text-gray-300 font-mono text-sm whitespace-pre-wrap">
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
                    <h3 className="text-base sm:text-lg font-medium text-purple-400 mb-3">Example Usage</h3>
                    <div className="relative">
                      <pre className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-3 sm:p-4 text-gray-300 font-mono text-sm whitespace-pre-wrap">
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
              <div className="p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="text-purple-400" size={20} />
                  Expert-Level Hints
                </h2>
                <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <Circle size={6} className="text-purple-400 mt-2 flex-shrink-0" />
                    Master 'chain-of-thought' prompting to guide the AI through complex reasoning steps.
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle size={6} className="text-purple-400 mt-2 flex-shrink-0" />
                    Use 'few-shot' prompting with concrete examples to teach the AI your desired output format.
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle size={6} className="text-purple-400 mt-2 flex-shrink-0" />
                    Define a clear 'persona' for the AI (e.g., 'expert copywriter') for consistent, context-aware responses.
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle size={6} className="text-purple-400 mt-2 flex-shrink-0" />
                    Iterate on your prompts as a collaborative process; analyze outputs and refine your instructions.
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
