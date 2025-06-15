
export type ScenarioKey =
  | "date"
  | "family"
  | "work"
  | "party"
  | "networking";

export interface ScenarioConfig {
  key: ScenarioKey;
  icon: string;
  title: string;
  color: string;
}
export const scenarios: Record<ScenarioKey, ScenarioConfig> = {
  date: { icon: "💕", title: "First Date", color: "#FF6B6B", key: "date" },
  family: { icon: "🍽️", title: "Family Dinner", color: "#4ECDC4", key: "family" },
  work: { icon: "💼", title: "Work Meeting", color: "#45B7D1", key: "work" },
  party: { icon: "🎉", title: "Party/Social", color: "#96CEB4", key: "party" },
  networking: { icon: "🤝", title: "Networking", color: "#FFEAA7", key: "networking" }
};
