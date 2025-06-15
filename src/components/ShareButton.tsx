
import React from "react";
import { ArrowUp } from "lucide-react";

type ShareButtonProps = {
  text: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({ text }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        text
      });
    } else {
      window.open(`mailto:?body=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex gap-1 items-center px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow transition"
      title="Share"
    >
      <ArrowUp size={16} />
      Share
    </button>
  );
};

export default ShareButton;
