import React, { useState, useEffect } from "react";
import { Newspaper, ExternalLink, Calendar, Filter } from "lucide-react";

interface NewsArticle {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
}

const NewsFeed = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "defi" | "blockchain">("all");

  useEffect(() => {
    // Mock data for immediate demo (replace with real RSS later)
    const mockArticles: NewsArticle[] = [
      {
        title: "DeFi TVL Reaches New All-Time High",
        description:
          "Total Value Locked in DeFi protocols surpasses $200 billion as institutional adoption continues to grow across major platforms.",
        link: "https://coindesk.com/defi-tvl-ath",
        pubDate: "2025-09-09T10:30:00Z",
        thumbnail:
          "https://via.placeholder.com/150x100/4F46E5/ffffff?text=DeFi",
      },
      {
        title: "Polygon Announces Major Network Upgrade",
        description:
          "The layer-2 scaling solution introduces new features for improved transaction throughput and reduced gas fees.",
        link: "https://coindesk.com/polygon-upgrade",
        pubDate: "2025-09-09T08:15:00Z",
        thumbnail:
          "https://via.placeholder.com/150x100/8B5CF6/ffffff?text=Polygon",
      },
      {
        title: "Staking Rewards Hit Record Levels",
        description:
          "Ethereum validators and other proof-of-stake networks see increased yields as more tokens are locked in staking contracts.",
        link: "https://coindesk.com/staking-rewards",
        pubDate: "2025-09-08T16:45:00Z",
        thumbnail:
          "https://via.placeholder.com/150x100/10B981/ffffff?text=Staking",
      },
      {
        title: "New ERC-20 Standards Approved",
        description:
          "Ethereum improvement proposals introduce enhanced token standards with better security and functionality for DeFi applications.",
        link: "https://coindesk.com/erc20-standards",
        pubDate: "2025-09-08T14:20:00Z",
        thumbnail:
          "https://via.placeholder.com/150x100/F59E0B/ffffff?text=ERC20",
      },
      {
        title: "Blockchain Adoption in Enterprise",
        description:
          "Major corporations integrate blockchain technology for supply chain management and digital asset management solutions.",
        link: "https://coindesk.com/enterprise-blockchain",
        pubDate: "2025-09-08T11:00:00Z",
        thumbnail:
          "https://via.placeholder.com/150x100/EF4444/ffffff?text=Enterprise",
      },
    ];

    // Simulate API call delay
    const loadArticles = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setArticles(mockArticles);
      setLoading(false);
    };

    loadArticles();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredArticles = articles.filter((article) => {
    if (filter === "all") return true;
    if (filter === "defi")
      return (
        article.title.toLowerCase().includes("defi") ||
        article.description.toLowerCase().includes("defi")
      );
    if (filter === "blockchain")
      return (
        article.title.toLowerCase().includes("blockchain") ||
        article.description.toLowerCase().includes("blockchain")
      );
    return true;
  });

  if (loading) {
    return (
      <div className="card-glass">
        <div className="flex items-center space-x-2 mb-6">
          <Newspaper className="w-5 h-5 text-green-400 animate-pulse" />
          <span className="text-xl font-bold">Loading News...</span>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-white/10 rounded mb-2"></div>
              <div className="h-3 bg-white/5 rounded mb-1"></div>
              <div className="h-3 bg-white/5 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card-glass">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Newspaper className="w-5 h-5 text-green-400" />
          <span className="text-xl font-bold">Crypto News</span>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 opacity-60" />
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "defi" | "blockchain")
            }
            className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm focus:outline-none focus:border-green-400"
          >
            <option value="all">All News</option>
            <option value="defi">DeFi</option>
            <option value="blockchain">Blockchain</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredArticles.map((article, index) => (
          <a
            key={index}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <div className="flex space-x-3">
              {article.thumbnail && (
                <div className="w-16 h-12 rounded bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Newspaper className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm leading-5 mb-1 group-hover:text-green-400 transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs opacity-60 mb-2 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs opacity-50">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(article.pubDate)}</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-80 transition-opacity" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-center opacity-50">
          News updates every 15 minutes
        </p>
      </div>
    </div>
  );
};

export default NewsFeed;
