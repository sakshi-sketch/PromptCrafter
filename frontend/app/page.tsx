"use client";

import { useState } from "react";
import promptsData from "../data/prompts.json";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSubmit = () => {
    const input = query.toLowerCase();

    let collected: string[] = [];

    // Detect multiple intents
    if (input.includes("email")) {
      collected.push(...promptsData.email);
    }

    if (input.includes("machine learning") || input.includes("ml")) {
      collected.push(...promptsData.machine_learning);
    }

    if (input.includes("resume")) {
      collected.push(...promptsData.resume);
    }

    // Remove duplicates & pick top 5
    const unique = Array.from(new Set(collected)).slice(0, 5);

    if (unique.length === 0) {
      setResults(["No matching prompts found"]);
    } else {
      setResults(unique);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Input */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">Enter Query</h2>

          <textarea
            className="w-full border p-3 mb-4 rounded text-black"
            rows={4}
            placeholder="Enter your query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-pink-600 py-2 rounded"
          >
            Generate Prompts
          </button>
        </div>

        {/* Output */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-pink-600 mb-4">Top 5 Prompts</h2>

          <ul className="space-y-3">
            {results.map((item, index) => (
              <li key={index} className="p-3 bg-black-50 rounded text-black">
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}