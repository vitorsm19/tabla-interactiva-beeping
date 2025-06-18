import type { ColumnDef } from "@tanstack/react-table";

export type Work = {
  id: string;
  title: string;
  publication_year: number;
  cited_by_count: number;
  authorships: { author: { display_name: string } }[];
};

export const columns: ColumnDef<Work>[] = [
  { accessorKey: "title", header: "Título" },
  { accessorKey: "publication_year", header: "Año" },
  { accessorKey: "cited_by_count", header: "Citaciones" },
  {
    header: "Autores",
    accessorFn: (row) =>
      row.authorships
        ?.slice(0, 2)
        .map((a) => a.author.display_name)
        .join(", ") || "",
    id: "authors",
  },
];
