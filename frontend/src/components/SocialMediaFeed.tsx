import React, { useEffect } from "react";
import { Twitter, MessageCircle, Users } from "lucide-react";

const SocialMediaFeed = () => {
  useEffect(() => {
    // Load Twitter widgets script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        'script[src="https://platform.twitter.com/widgets.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="card-glass">
      <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
        <Twitter className="w-5 h-5 text-blue-400" />
        <span>Community & Updates</span>
      </h3>

      {/* Twitter Timeline Embed */}
      <div className="mb-6">
        <a
          className="twitter-timeline"
          data-height="400"
          data-theme="dark"
          data-chrome="noheader nofooter noborders transparent"
          href="https://twitter.com/ethereum?ref_src=twsrc%5Etfw"
        >
          Loading tweets...
        </a>
      </div>

      {/* Social Buttons */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium opacity-80 mb-3">
          Join Our Community
        </h4>

        <a
          href="https://twitter.com/ethereum"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
        >
          <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Twitter className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium">Follow on Twitter</div>
            <div className="text-sm opacity-60">
              Latest updates & announcements
            </div>
          </div>
        </a>

        <a
          href="https://t.me/ethereum"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
        >
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium">Join Telegram</div>
            <div className="text-sm opacity-60">Chat with the community</div>
          </div>
        </a>

        <a
          href="https://discord.gg/ethereum"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
        >
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium">Join Discord</div>
            <div className="text-sm opacity-60">Voice & text discussions</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default SocialMediaFeed;
