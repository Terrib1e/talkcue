
import React from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

type StarterCardProps = {
  text: string;
  tone: string;
  explanation: string;
  onCopy?: () => void;
  onShare?: () => void;
};

const toneColors: Record<string, string> = {
  casual: "bg-blue-100 text-blue-700",
  thoughtful: "bg-emerald-100 text-emerald-700",
  playful: "bg-yellow-100 text-yellow-800",
  professional: "bg-gray-100 text-gray-800",
  romantic: "bg-pink-100 text-pink-700"
};

const StarterCard: React.FC<StarterCardProps> = ({
  text,
  tone,
  explanation,
  onCopy,
  onShare
}) => {
  const [showTip, setShowTip] = React.useState(false);

  return (
    <div className="relative bg-white rounded-2xl px-7 py-5 flex flex-col gap-2 shadow-md border border-border animate-fade-in">
      <span className="text-lg font-semibold">{text}</span>
      <div className="flex items-center gap-2">
        <span className={cn("px-2 py-0.5 text-xs rounded-full capitalize", toneColors[tone] ?? "bg-muted text-muted-foreground")}>{tone}</span>
        <button
          type="button"
          className="ml-2 text-gray-400 hover:text-primary relative"
          tabIndex={0}
          aria-label="Why this works"
          onFocus={() => setShowTip(true)}
          onBlur={() => setShowTip(false)}
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
        >
          <Info size={18} />
          {showTip && (
            <div className="absolute left-8 z-10 top-1/2 -translate-y-1/2 bg-card border border-border rounded p-3 text-sm shadow-xl w-[230px] animate-fade-in">
              {explanation}
            </div>
          )}
        </button>
        <button
          onClick={onCopy}
          className="ml-auto px-2 py-1 rounded hover:bg-blue-50 text-blue-600 font-medium transition"
          title="Copy starter"
          tabIndex={0}
        >
          Copy
        </button>
        <button
          onClick={onShare}
          className="px-2 py-1 rounded hover:bg-green-50 text-green-600 font-medium transition"
          title="Share starter"
          tabIndex={0}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default StarterCard;
