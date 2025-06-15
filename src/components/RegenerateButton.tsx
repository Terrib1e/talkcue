
import React from "react";
import { ArrowRight } from "lucide-react";

type RegenerateButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

const RegenerateButton: React.FC<RegenerateButtonProps> = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-accent text-accent-foreground hover:scale-105 font-semibold shadow transition-all ring-1 ring-border"
    disabled={disabled}
    tabIndex={0}
  >
    <ArrowRight size={18} />
    Regenerate
  </button>
);

export default RegenerateButton;
