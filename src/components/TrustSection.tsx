import React from 'react';
import { Search, Brain, FileText } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: "SPECTER2 Semantic Retrieval",
      description: "Generates document embeddings to find the most relevant papers within the biomedical research graph."
    },
    {
      icon: Brain,
      title: "DeBERTa-v3 Natural Language Inference",
      description: "Performs strict logical classification of evidence relevance: SUPPORT, CONTRADICT, or NEI."
    },
    {
      icon: FileText,
      title: "SciFact Research Corpus",
      description: "Trained and benchmarked on 1,400+ expert-annotated scientific claims and abstracts."
    }
  ];

  return (
    <section className="mt-16 border-t border-white/5 bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h3 className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
          Credible NLP Pipeline Infrastructure
        </h3>
        
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="instrument-card instrument-card-hover p-6 flex flex-col items-start"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-cobalt mb-4 border border-blue-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-semibold text-slate-200">{step.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 font-mono">
            <IconBadge check />
            <span>Evidence-grounded RAG explanations</span>
          </div>
          <span className="hidden sm:inline text-slate-700">•</span>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 font-mono">
            <IconBadge check />
            <span>Peer-reviewed scientific indexing</span>
          </div>
          <span className="hidden sm:inline text-slate-300/10">•</span>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 font-mono">
            <IconBadge check />
            <span>Verifiable source DOI citations</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const IconBadge: React.FC<{ check?: boolean }> = () => {
  return (
    <span className="h-4 w-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[9px] text-emerald-400 font-extrabold select-none success-glow">
      ✓
    </span>
  );
};
