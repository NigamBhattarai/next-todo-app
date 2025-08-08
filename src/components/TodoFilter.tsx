"use client";

import { useState } from "react";

export type FilterType = "all" | "high" | "medium" | "low" | "overdue";

interface TodoFilterProps {
  onFilterChange: (filter: FilterType) => void;
  activeFilter: FilterType;
}

const TodoFilter = ({ onFilterChange, activeFilter }: TodoFilterProps) => {
  const filters = [
    { key: "all", label: "All", icon: "📋" },
    { key: "high", label: "High Priority", icon: "🔴" },
    { key: "medium", label: "Medium Priority", icon: "🟡" },
    { key: "low", label: "Low Priority", icon: "🟢" },
    { key: "overdue", label: "Overdue", icon: "⚠️" },
  ] as const;

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key as FilterType)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeFilter === filter.key
              ? "bg-slate-300 text-slate-900"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          <span className="mr-2">{filter.icon}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
