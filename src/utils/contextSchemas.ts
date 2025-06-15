
import { ScenarioKey } from "./scenarios";
// Field config: type, label, options (for selects)
export type ContextFieldConfig = {
  key: string;
  label: string;
  type: "text" | "select" | "textarea";
  options?: string[]; // For select
  placeholder?: string;
  required?: boolean;
};

type ContextSchema = { [key in ScenarioKey]: ContextFieldConfig[] };

export const contextSchemas: ContextSchema = {
  date: [
    { key: "age_range", label: "Age Range", type: "select", options: ["18-25", "26-35", "36-50", "50+"], required: true },
    { key: "interests", label: "Interests", type: "text", placeholder: "e.g. hiking, music, coffee", required: false },
    { key: "location_type", label: "Location Type", type: "select", options: ["Cafe", "Bar", "Restaurant", "Park", "Home"], required: true },
    { key: "vibe_preference", label: "Vibe Preference", type: "select", options: ["Lighthearted", "Deep", "Funny", "Romantic"], required: false }
  ],
  family: [
    { key: "family_members", label: "Family Members", type: "text", placeholder: "e.g. parents, siblings", required: true },
    { key: "occasion", label: "Occasion", type: "select", options: ["Birthday", "Holiday", "Casual", "Graduation", "Other"], required: false },
    { key: "recent_events", label: "Recent Events", type: "textarea", placeholder: "Any recent highlights or challenges?", required: false },
    { key: "sensitive_topics", label: "Sensitive Topics", type: "text", placeholder: "e.g. politics, health", required: false }
  ],
  work: [
    { key: "meeting_type", label: "Meeting Type", type: "select", options: ["One-on-One", "Team Meeting", "All-Hands", "Project Kickoff", "Other"], required: true },
    { key: "attendees", label: "Attendees", type: "text", placeholder: "e.g. managers, team, clients", required: true },
    { key: "goals", label: "Goals", type: "textarea", placeholder: "What needs to be accomplished?", required: false },
    { key: "formality_level", label: "Formality Level", type: "select", options: ["Casual", "Standard", "Very Formal"], required: true }
  ],
  party: [
    { key: "theme", label: "Party Theme", type: "text", placeholder: "e.g. 80s, beach", required: false },
    { key: "group_size", label: "Group Size", type: "select", options: ["Small (3-8)", "Medium (9-25)", "Large (25+)", "Unknown"], required: true },
    { key: "prior_connections", label: "Connections", type: "select", options: ["Mostly friends", "Mostly strangers", "Mixed"], required: false }
  ],
  networking: [
    { key: "industry", label: "Industry", type: "text", placeholder: "e.g. tech, health", required: true },
    { key: "event_type", label: "Event Type", type: "select", options: ["Conference", "Meetup", "Workshop", "Social"], required: false },
    { key: "goals", label: "Goals", type: "textarea", placeholder: "What do you hope to achieve?", required: false }
  ]
};
