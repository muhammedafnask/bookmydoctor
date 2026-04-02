import React, { useState } from 'react';
import { Search, BookOpen, Clock, ArrowRight, Loader2, Globe } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { geminiService } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface HealthArticlesProps {
  language: Language;
}

interface NewsSource {
  title: string;
  uri: string;
}

export const HealthArticles: React.FC<HealthArticlesProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{ text: string, sources: NewsSource[] } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;

    setIsSearching(true);
    try {
      const result = await geminiService.searchLatestMedicalNews(searchQuery);
      setSearchResult(result);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const articles = [
    {
      title: language === 'EN' ? "Understanding Heart Health" : "हृदय स्वास्थ्य को समझना",
      category: language === 'EN' ? "Cardiology" : "हृदय रोग विज्ञान",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1505751172107-573225a91200?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: language === 'EN' ? "The Importance of Sleep" : "नींद का महत्व",
      category: language === 'EN' ? "Wellness" : "कल्याण",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1511295742364-9119143661c1?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: language === 'EN' ? "Mental Health in Digital Age" : "डिजिटल युग में मानसिक स्वास्थ्य",
      category: language === 'EN' ? "Psychology" : "मनोविज्ञान",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?q=80&w=400&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <BookOpen className="w-3.5 h-3.5" /> {t.healthArticles}
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">{t.latestArticles}</h2>
          </div>
          
          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'EN' ? "Search latest medical news..." : "नवीनतम चिकित्सा समाचार खोजें..."}
              className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-4 focus:ring-sky-100 outline-none font-bold text-slate-700"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <button 
              type="submit"
              disabled={isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors disabled:opacity-50"
            >
              {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

        {searchResult && (
          <div className="mb-16 bg-white p-8 md:p-12 rounded-[48px] shadow-xl shadow-sky-100 border border-sky-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-sky-600 font-black uppercase text-[10px] tracking-widest mb-6">
                <Globe className="w-4 h-4" /> AI Grounded Search Results
              </div>
              <div className="prose prose-slate max-w-none mb-8">
                <ReactMarkdown>{searchResult.text}</ReactMarkdown>
              </div>
              {searchResult.sources.length > 0 && (
                <div className="pt-8 border-t border-slate-100">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Sources</h4>
                  <div className="flex flex-wrap gap-3">
                    {searchResult.sources.map((source, i) => (
                      <a 
                        key={i} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-slate-50 hover:bg-sky-50 text-slate-600 hover:text-sky-600 rounded-xl text-xs font-bold transition-all border border-slate-100"
                      >
                        {source.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={i} className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-sky-600">
                  {article.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4">
                  <Clock className="w-4 h-4" /> {article.readTime}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-6 leading-tight group-hover:text-sky-600 transition-colors">
                  {article.title}
                </h3>
                <button className="flex items-center text-sky-600 font-black uppercase text-[10px] tracking-widest group-hover:gap-3 transition-all">
                  {t.readMore} <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
