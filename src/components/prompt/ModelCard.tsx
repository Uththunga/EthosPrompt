import React from 'react';

interface ModelCardProps {
  name: string;
  img: string;
  description: string;
  bestFor: string;
}

/** Simple reusable card for displaying an LLM in the Basics & Techniques pages. */
const ModelCard: React.FC<ModelCardProps> = ({ name, img, description, bestFor }) => (
  <div className="group relative">
    <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400/20 to-indigo-400/20 p-3 border border-purple-500/30 shadow-lg">
          <img src={img} alt={`${name} Logo`} className="w-full h-full object-contain filter brightness-150" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white text-center mb-3 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
        {name}
      </h3>
      <p className="text-gray-300 text-center text-sm leading-relaxed">{description}</p>
      <div className="mt-4 bg-purple-500/10 p-3 rounded border border-purple-500/20">
        <p className="text-purple-200 text-xs text-center">💡 Best for: {bestFor}</p>
      </div>
    </div>
  </div>
);

export default ModelCard;
