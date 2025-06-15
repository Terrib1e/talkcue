
import React from "react";
import { cn } from "@/lib/utils";
import { ScenarioConfig } from "@/utils/scenarios";

type ScenarioCardProps = {
  scenario: ScenarioConfig;
  selected?: boolean;
  onClick?: () => void;
};

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, selected, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center p-6 rounded-xl transition-all cursor-pointer w-full md:w-48 h-44 shadow-lg group",
      selected
        ? "ring-4 ring-primary ring-offset-2 scale-105"
        : "hover:scale-105 ring-2 ring-transparent hover:ring-primary/30",
      "bg-white"
    )}
    style={{ borderColor: scenario.color }}
    aria-pressed={selected}
  >
    <span
      className="text-5xl mb-2"
      aria-label={scenario.title}
      style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }}
    >
      {scenario.icon}
    </span>
    <span className="font-bold text-lg" style={{ color: scenario.color }}>
      {scenario.title}
    </span>
  </button>
);

export default ScenarioCard;
