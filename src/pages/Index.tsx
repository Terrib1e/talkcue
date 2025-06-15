
// Top-level app page for Conversation Starter Generator
import React from "react";
import { scenarios, ScenarioKey } from "@/utils/scenarios";
import { contextSchemas } from "@/utils/contextSchemas";
import ScenarioCard from "@/components/ScenarioCard";
import ContextForm from "@/components/ContextForm";
import StarterCard from "@/components/StarterCard";
import RegenerateButton from "@/components/RegenerateButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";

type Starter = {
  text: string;
  tone: string;
  explanation: string;
};

const STORAGE_KEY = "ai-conv-starters-history";

const Index: React.FC = () => {
  const [selected, setSelected] = React.useState<ScenarioKey | null>(null);
  const [step, setStep] = React.useState<"select" | "context" | "results">("select");
  const [form, setForm] = React.useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [starters, setStarters] = React.useState<Starter[]>([]);
  const [history, setHistory] = React.useState<
    { scenario: ScenarioKey; form: Record<string, string>; starters: Starter[]; created: number }[]
  >([]);
  const { toast } = useToast();

  // Persist history in localStorage
  React.useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
    } catch {
      setHistory([]);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  // Mock AI call: returns fake starters based on scenario + context (can wire to actual Claude next)
  const generateStarters = async (scenario: ScenarioKey, ctx: Record<string, string>): Promise<Starter[]> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1100)); // Simulate API delay
    // Example hardcoded data based on 'tone'
    const tones = ["casual", "thoughtful", "playful", "professional", "romantic"];
    return Array.from({ length: 5 }).map((_, idx) => ({
      text: `Sample starter #${idx + 1} for ${scenarios[scenario].title}${ctx ? "..." : ""}`,
      tone: tones[idx % tones.length],
      explanation: "This starter matches the scenario by being relevant, open-ended, and inviting. (Replace with real explanation.)"
    }));
  };

  const handleScenarioSelect = (key: ScenarioKey) => {
    setSelected(key);
    setStep("context");
    setForm({});
  };

  const handleFormChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    if (!selected) return;
    setIsLoading(true);
    setStarters([]);
    try {
      const starters = await generateStarters(selected, form);
      setStarters(starters);
      setStep("results");
      setHistory(prev => [
        { scenario: selected, form, starters, created: Date.now() },
        ...prev.slice(0, 9)
      ]);
    } catch (err) {
      toast({
        title: "Failed to generate starters",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (starter: Starter) => {
    navigator.clipboard.writeText(starter.text);
    toast({ title: "Copied!", description: "Starter copied to clipboard." });
  };

  // On page: landing/selection → dynamic context form → results panel
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-0">
      {/* Hero section */}
      <header className="py-12 flex flex-col items-center justify-center animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 tracking-tight text-primary">
          AI Conversation Starter Generator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-2">
          Instantly get tailor-made conversation openers for any situation. Select your scenario, give a little context, and let AI help you connect!
        </p>
        <div className="mt-8 flex flex-wrap gap-6 justify-center w-full max-w-4xl">
          {Object.values(scenarios).map(s => (
            <ScenarioCard
              key={s.key}
              scenario={s}
              selected={selected === s.key}
              onClick={() => handleScenarioSelect(s.key)}
            />
          ))}
        </div>
      </header>

      {/* Main panel: dynamic form and results */}
      <main className="flex flex-col items-center w-full grow">
        {step === "context" && selected && (
          <section className="mt-0 w-full max-w-2xl px-4 animate-fade-in">
            <h2 className="font-semibold text-2xl mb-4 text-primary">
              {scenarios[selected].icon} {scenarios[selected].title}
            </h2>
            <ContextForm
              schema={contextSchemas[selected]}
              values={form}
              onChange={handleFormChange}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
            <button
              onClick={() => setStep("select")}
              className="mt-4 text-sm text-gray-500 hover:text-primary underline"
              tabIndex={0}
              type="button"
            >
              ← Back to scenarios
            </button>
          </section>
        )}

        {step === "results" && (
          <section className="w-full max-w-3xl px-4 animate-fade-in">
            <h2 className="font-semibold text-2xl mt-2 mb-4 text-primary">
              {selected ? scenarios[selected].icon : ""} Suggestions
            </h2>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="grid gap-5">
                {starters.map((starter, i) => (
                  <StarterCard
                    key={i}
                    text={starter.text}
                    tone={starter.tone}
                    explanation={starter.explanation}
                    onCopy={() => handleCopy(starter)}
                    onShare={() => window.open(`mailto:?body=${encodeURIComponent(starter.text)}`, "_blank")}
                  />
                ))}
              </div>
            )}
            <div className="flex gap-3 mt-8">
              <RegenerateButton onClick={handleGenerate} disabled={isLoading} />
              <button
                className="px-5 py-2 rounded-lg border border-border bg-muted text-muted-foreground font-semibold hover:bg-muted/90 transition ml-auto"
                onClick={() => setStep("context")}
                type="button"
              >
                New context
              </button>
            </div>
            {/* History panel */}
            <div className="mt-8">
              <details>
                <summary className="cursor-pointer underline text-base text-primary/80 font-medium mb-2">
                  Show recent generations
                </summary>
                <ul className="list-disc pl-6">
                  {history.length === 0 && (
                    <li className="text-muted-foreground">No history yet.</li>
                  )}
                  {history.map((h, idx) => (
                    <li key={h.created} className="mb-2">
                      <span className="font-medium">{scenarios[h.scenario].title}</span> —
                      <span className="text-xs text-gray-400 ml-1">
                        {new Date(h.created).toLocaleString()}
                      </span>
                      <ul className="pl-3 list-disc">
                        {h.starters.slice(0, 2).map((s, i) => (
                          <li key={i} className="text-sm">
                            <span className="text-gray-700">{s.text}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
