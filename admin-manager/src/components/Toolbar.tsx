import type { Filters, StatusFilter, TypeFilter } from "../lib/filter";
import type { RegistrationStatus } from "../types";
import { DownloadIcon, SearchIcon } from "./icons";

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
  /** Count after filtering / total in the collection. */
  shown: number;
  total: number;
  onExport: () => void;
}

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const TYPE_TABS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "Physical", label: "Physical" },
  { value: "Virtual", label: "Virtual" },
];

export function Toolbar({ filters, onChange, shown, total, onExport }: Props) {
  return (
    <div className="toolbar">
      <div className="toolbar__search">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search name, email, institution, location…"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          aria-label="Search registrations"
        />
      </div>

      <div className="toolbar__filters">
        <div className="segmented" role="group" aria-label="Filter by status">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              className={`segmented__btn ${filters.status === tab.value ? "is-active" : ""}`}
              aria-pressed={filters.status === tab.value}
              onClick={() =>
                onChange({
                  ...filters,
                  status: tab.value as RegistrationStatus | "all",
                })
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="segmented" role="group" aria-label="Filter by participant type">
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              className={`segmented__btn ${filters.type === tab.value ? "is-active" : ""}`}
              aria-pressed={filters.type === tab.value}
              onClick={() => onChange({ ...filters, type: tab.value })}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="toolbar__end">
        <span className="toolbar__count">
          <strong>{shown}</strong> of {total}
        </span>
        <button
          type="button"
          className="btn"
          onClick={onExport}
          disabled={shown === 0}
          title="Export the current view to CSV"
        >
          <DownloadIcon />
          <span>Export CSV</span>
        </button>
      </div>
    </div>
  );
}
