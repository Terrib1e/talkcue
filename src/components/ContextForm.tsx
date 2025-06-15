
import React from "react";
import { ContextFieldConfig } from "@/utils/contextSchemas";

type ContextFormProps = {
  schema: ContextFieldConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
};

const ContextForm: React.FC<ContextFormProps> = ({
  schema,
  values,
  onChange,
  onSubmit,
  isLoading,
}) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}
    className="grid gap-5 bg-card rounded-2xl p-7 shadow-xl animate-fade-in"
    tabIndex={-1}
  >
    {schema.map(field => {
      if (field.type === "select" && field.options) {
        return (
          <div key={field.key} className="flex flex-col gap-1">
            <label className="font-medium" htmlFor={field.key}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </label>
            <select
              className="border border-border rounded px-3 py-2"
              id={field.key}
              name={field.key}
              value={values[field.key] || ""}
              required={field.required}
              onChange={e => onChange(field.key, e.target.value)}
              autoComplete="off"
            >
              <option value="">Select...</option>
              {field.options.map(option => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      }
      if (field.type === "textarea") {
        return (
          <div key={field.key} className="flex flex-col gap-1">
            <label className="font-medium" htmlFor={field.key}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </label>
            <textarea
              className="border border-border rounded px-3 py-2 min-h-[60px]"
              id={field.key}
              name={field.key}
              placeholder={field.placeholder}
              value={values[field.key] || ""}
              required={field.required}
              onChange={e => onChange(field.key, e.target.value)}
              autoComplete="off"
            />
          </div>
        );
      }
      return (
        <div key={field.key} className="flex flex-col gap-1">
          <label className="font-medium" htmlFor={field.key}>
            {field.label} {field.required && <span className="text-destructive">*</span>}
          </label>
          <input
            className="border border-border rounded px-3 py-2"
            id={field.key}
            name={field.key}
            type="text"
            placeholder={field.placeholder}
            value={values[field.key] || ""}
            required={field.required}
            onChange={e => onChange(field.key, e.target.value)}
            autoComplete="off"
          />
        </div>
      );
    })}

    <button
      className="w-full mt-2 px-4 py-2 rounded-lg font-semibold bg-primary text-primary-foreground hover:scale-105 hover:bg-primary/90 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? "Generating..." : "Generate Starters"}
    </button>
  </form>
);

export default ContextForm;
