import React, { useEffect } from "react";
import { Twitter, MessageCircle, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const SocialMediaFeed = () => {
  const { t } = useLanguage();

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
        <span>{t("social.title")}</span>
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
          {t("social.loading")}
        </a>
      </div>

      {/* Social Buttons */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium opacity-80 mb-3">
          {t("social.join")}
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
            <div className="font-medium">{t("social.twitter.title")}</div>
            <div className="text-sm opacity-60">
              {t("social.twitter.description")}
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
            <div className="font-medium">{t("social.telegram.title")}</div>
            <div className="text-sm opacity-60">
              {t("social.telegram.description")}
            </div>
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
            <div className="font-medium">{t("social.discord.title")}</div>
            <div className="text-sm opacity-60">
              {t("social.discord.description")}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default SocialMediaFeed;
