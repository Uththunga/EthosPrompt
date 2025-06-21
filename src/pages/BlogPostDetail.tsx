import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Download,
  Share2,
  BookOpen,
  User,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Play,
  Settings
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getPostByPath, getRelatedPosts, CATEGORIES, type BlogPost } from '../data/blog-posts';
import ReadingProgress from '../components/blog/ReadingProgress';
import BookmarkButton from '../components/blog/BookmarkButton';
import InteractiveCodeBlock from '../components/blog/InteractiveCodeBlock';
import { useContentDiscovery } from '../hooks/useContentDiscovery';
import SwipeNavigation from '../components/mobile/SwipeNavigation';
import ExpandableSection, { TableOfContents } from '../components/mobile/ExpandableSection';
import LongPressMenu from '../components/mobile/LongPressMenu';
import OfflineReading from '../components/mobile/OfflineReading';
import PageTransition from '../components/mobile/PageTransition';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const { getImprovedRelatedPosts } = useContentDiscovery();

  useEffect(() => {
    if (slug) {
      const foundPost = getPostByPath(`/blog/${slug}`);
      if (foundPost) {
        setPost(foundPost);
        // Use improved related posts algorithm
        const improvedRelated = getImprovedRelatedPosts(foundPost, 3);
        setRelatedPosts(improvedRelated.map(rec => rec.post));
        
        // Set page title and meta description
        document.title = foundPost.seoTitle || `${foundPost.title} | EthosPrompt`;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', foundPost.seoDescription || foundPost.excerpt);
        }
      }
    }
  }, [slug]);

  useEffect(() => {
    // Scroll spy for table of contents
    const handleScroll = () => {
      if (!post?.tableOfContents) return;

      const sections = post.tableOfContents.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(post.tableOfContents[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const getDifficultyColor = (difficulty: BlogPost['difficulty']) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: url,
        });
      } catch (err) {
        // Fallback to clipboard
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const renderContent = (content: string) => {
    // Split content by code blocks and regular text
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // Extract language and code
        const lines = part.slice(3, -3).split('\n');
        const language = lines[0].trim() || 'text';
        const code = lines.slice(1).join('\n');

        // Generate playground URL for supported languages
        const getPlaygroundUrl = (lang: string, codeContent: string) => {
          switch (lang.toLowerCase()) {
            case 'python':
              return `https://repl.it/languages/python3?code=${encodeURIComponent(codeContent)}`;
            case 'javascript':
            case 'js':
              return `https://codepen.io/pen?template=javascript&code=${encodeURIComponent(codeContent)}`;
            case 'typescript':
            case 'ts':
              return `https://www.typescriptlang.org/play?#code/${encodeURIComponent(btoa(codeContent))}`;
            default:
              return undefined;
          }
        };

        return (
          <div key={index} className="my-8">
            <InteractiveCodeBlock
              code={code}
              language={language}
              title={`${language.charAt(0).toUpperCase() + language.slice(1)} Example`}
              allowCopy={true}
              allowDownload={true}
              playgroundUrl={getPlaygroundUrl(language, code)}
              showLineNumbers={true}
            />
          </div>
        );
      } else {
        // Regular markdown-style content
        return (
          <div 
            key={index} 
            className="prose prose-invert prose-purple max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: part
                .replace(/^# (.*$)/gm, '<h1 id="$1" class="text-4xl font-bold text-white mb-6 mt-8">$1</h1>')
                .replace(/^## (.*$)/gm, '<h2 id="$1" class="text-3xl font-semibold text-white mb-4 mt-8">$1</h2>')
                .replace(/^### (.*$)/gm, '<h3 id="$1" class="text-2xl font-semibold text-white mb-3 mt-6">$1</h3>')
                .replace(/^\*\*(.*?)\*\*/gm, '<strong class="text-white font-semibold">$1</strong>')
                .replace(/^\*(.*?)\*/gm, '<em class="text-gray-300 italic">$1</em>')
                .replace(/^- (.*$)/gm, '<li class="text-gray-300 mb-2">$1</li>')
                .replace(/\n\n/g, '</p><p class="text-gray-300 leading-relaxed mb-4">')
                .replace(/^(?!<[h|l|s])/gm, '<p class="text-gray-300 leading-relaxed mb-4">')
                .replace(/$(?![>])/gm, '</p>')
            }}
          />
        );
      }
    });
  };

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const categoryInfo = CATEGORIES.find(cat => cat.id === post.category);

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Reading Progress */}
      <ReadingProgress
        content={post.content}
        readTime={post.readTime}
        tableOfContents={post.tableOfContents}
      />
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/blog" className="hover:text-purple-400 transition-colors">Blog</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-300">{post.title}</span>
        </nav>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Article Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Link 
                    to="/blog"
                    className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                  </Link>
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge variant="default" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {categoryInfo?.name}
                  </Badge>
                  <Badge className={`border ${getDifficultyColor(post.difficulty)}`}>
                    {post.difficulty}
                  </Badge>
                  {post.hasCodeExamples && (
                    <Badge variant="outline" className="border-green-500/30 text-green-400">
                      Code Examples
                    </Badge>
                  )}
                  {post.hasDownloads && (
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      Resources
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  {post.excerpt}
                </p>

                {/* Author and Meta */}
                <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-gray-700/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">{post.author.name}</p>
                      <p className="text-gray-400">{post.author.role}</p>
                      <p className="text-gray-500 text-sm mt-1">{post.author.bio}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-3">
                      <BookmarkButton
                        post={post}
                        variant="default"
                        size="sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        className="border-gray-600 text-gray-400 hover:text-white"
                      >
                        {copiedUrl ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
                        {copiedUrl ? 'Copied!' : 'Share'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-invert prose-purple max-w-none">
                {renderContent(post.content)}
              </div>

              {/* Downloads Section */}
              {post.downloads && post.downloads.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-700/50">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Download className="w-6 h-6 mr-3" />
                    Download Resources
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {post.downloads.map((download, index) => (
                      <Card key={index} className="bg-gray-800/40 border-gray-700/50 p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-2">{download.title}</h4>
                            <p className="text-gray-400 text-sm mb-3">{download.description}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <span className="mr-3">{download.size}</span>
                              <span className="uppercase">{download.type}</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-4 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                {post.tableOfContents && post.tableOfContents.length > 0 && (
                  <Card className="bg-gray-800/40 border-gray-700/50 p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Table of Contents
                    </h3>
                    <nav className="space-y-2">
                      {post.tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block text-sm transition-colors ${
                            activeSection === item.id
                              ? 'text-purple-400 font-medium'
                              : 'text-gray-400 hover:text-gray-300'
                          } ${item.level === 3 ? 'ml-4' : ''}`}
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </Card>
                )}

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <Card className="bg-gray-800/40 border-gray-700/50 p-6">
                    <h3 className="text-white font-semibold mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          to={relatedPost.path}
                          className="block group"
                        >
                          <h4 className="text-gray-300 font-medium group-hover:text-purple-400 transition-colors text-sm leading-tight mb-2">
                            {relatedPost.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {relatedPost.readTime}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
