import type { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

export type Work = {
  id: string;
  title: string;
  publication_year: number;
  cited_by_count: number;
  authorships: { author: { display_name: string } }[];
};

export const columns = (
  sortOrder: "desc" | "asc",
  onSortToggle: () => void
): ColumnDef<Work>[] => [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ getValue }) => {
      const value = getValue();
      return value === null ? "Título no disponible" : value;
    },
    size: 400,
  },
  { accessorKey: "publication_year", header: "Año", size: 100 },
  {
    accessorKey: "cited_by_count",
    header: () => (
      <button
        className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded cursor-pointer"
        onClick={onSortToggle}
      >
        Citaciones
        {sortOrder === "desc" ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronUp className="h-4 w-4" />
        )}
      </button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return value.toLocaleString("es-ES");
    },
    size: 100,
  },
  {
    header: "Autores",
    accessorFn: (row) =>
      row.authorships
        ?.slice(0, 2)
        .map((a) => a.author.display_name)
        .join(", ") || "Autores no disponibles",
    id: "authors",
    size: 200,
  },
];
