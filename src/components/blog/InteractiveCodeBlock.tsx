import React, { useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight, dracula, atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Play, Settings, Download, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface InteractiveCodeBlockProps {
  code: string;
  language: string;
  title?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  allowCopy?: boolean;
  allowDownload?: boolean;
  playgroundUrl?: string;
  className?: string;
}

const themes = {
  'oneDark': oneDark,
  'oneLight': oneLight,
  'dracula': dracula,
  'atomDark': atomDark
};

const InteractiveCodeBlock: React.FC<InteractiveCodeBlockProps> = ({
  code,
  language,
  title,
  filename,
  showLineNumbers = true,
  highlightLines = [],
  allowCopy = true,
  allowDownload = false,
  playgroundUrl,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themes>('oneDark');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `code.${getFileExtension(language)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileExtension = (lang: string): string => {
    const extensions: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      csharp: 'cs',
      php: 'php',
      ruby: 'rb',
      go: 'go',
      rust: 'rs',
      swift: 'swift',
      kotlin: 'kt',
      scala: 'scala',
      html: 'html',
      css: 'css',
      scss: 'scss',
      json: 'json',
      yaml: 'yml',
      xml: 'xml',
      sql: 'sql',
      bash: 'sh',
      shell: 'sh',
      powershell: 'ps1'
    };
    return extensions[lang.toLowerCase()] || 'txt';
  };

  const getLanguageDisplayName = (lang: string): string => {
    const displayNames: Record<string, string> = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      java: 'Java',
      cpp: 'C++',
      c: 'C',
      csharp: 'C#',
      php: 'PHP',
      ruby: 'Ruby',
      go: 'Go',
      rust: 'Rust',
      swift: 'Swift',
      kotlin: 'Kotlin',
      scala: 'Scala',
      html: 'HTML',
      css: 'CSS',
      scss: 'SCSS',
      json: 'JSON',
      yaml: 'YAML',
      xml: 'XML',
      sql: 'SQL',
      bash: 'Bash',
      shell: 'Shell',
      powershell: 'PowerShell'
    };
    return displayNames[lang.toLowerCase()] || lang.toUpperCase();
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Header */}
      {(title || filename || allowCopy || allowDownload || playgroundUrl) && (
        <div className="flex items-center justify-between bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 border-b-0 rounded-t-xl px-4 py-3">
          <div className="flex items-center gap-3">
            {(title || filename) && (
              <div>
                {title && (
                  <h4 className="text-sm font-medium text-gray-200">{title}</h4>
                )}
                {filename && (
                  <p className="text-xs text-gray-400">{filename}</p>
                )}
              </div>
            )}
            <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
              {getLanguageDisplayName(language)}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className="text-gray-400 hover:text-gray-300 p-2"
                title="Change theme"
              >
                <Settings className="w-4 h-4" />
              </Button>
              
              {showThemeSelector && (
                <div className="absolute top-full right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 min-w-32">
                  {Object.keys(themes).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => {
                        setSelectedTheme(theme as keyof typeof themes);
                        setShowThemeSelector(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                        selectedTheme === theme ? 'bg-gray-700 text-purple-400' : 'text-gray-300'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Playground Link */}
            {playgroundUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(playgroundUrl, '_blank')}
                className="text-gray-400 hover:text-gray-300 p-2"
                title="Open in playground"
              >
                <Play className="w-4 h-4" />
              </Button>
            )}

            {/* Download Button */}
            {allowDownload && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="text-gray-400 hover:text-gray-300 p-2"
                title="Download code"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}

            {/* Copy Button */}
            {allowCopy && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className={`p-2 transition-colors ${
                  copied 
                    ? 'text-green-400 hover:text-green-300' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                title={copied ? 'Copied!' : 'Copy code'}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Code Block */}
      <div ref={codeRef} className="relative">
        <SyntaxHighlighter
          language={language}
          style={themes[selectedTheme]}
          customStyle={{
            margin: 0,
            borderRadius: title || filename || allowCopy || allowDownload || playgroundUrl ? '0 0 12px 12px' : '12px',
            fontSize: '14px',
            lineHeight: '1.5',
            background: 'rgba(17, 24, 39, 0.8)',
            border: '1px solid rgba(75, 85, 99, 0.3)',
            borderTop: title || filename || allowCopy || allowDownload || playgroundUrl ? 'none' : '1px solid rgba(75, 85, 99, 0.3)',
          }}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: highlightLines.includes(lineNumber) 
                ? 'rgba(168, 85, 247, 0.1)' 
                : 'transparent',
              display: 'block',
              width: '100%'
            }
          })}
        >
          {code}
        </SyntaxHighlighter>

        {/* Copy overlay for mobile */}
        {allowCopy && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className={`bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 ${
                copied 
                  ? 'text-green-400 hover:text-green-300' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        )}
      </div>

      {/* Click outside to close theme selector */}
      {showThemeSelector && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowThemeSelector(false)}
        />
      )}
    </div>
  );
};

export default InteractiveCodeBlock;
