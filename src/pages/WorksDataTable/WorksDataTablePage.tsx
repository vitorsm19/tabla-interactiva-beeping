import { useState } from "react";
import { columns } from "./components/WorksDataTableColumns";
import { DataTable } from "@/components/DataTable/DataTable";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { useOpenAlexInfiniteQuery } from "@/hooks/useInfiniteScroll";
import { Table } from "lucide-react";

export default function WorksDataTablePage() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useOpenAlexInfiniteQuery({
      endpoint: "https://api.openalex.org/works",
      queryKey: ["works", query, sortOrder],
      searchParam: query ? `default.search:${query}` : undefined,
      sortParam:
        sortOrder === "desc" ? "cited_by_count:desc" : "cited_by_count",
      enabled: !!query || query === "",
      perPage: 20,
    });

  const allRows = data ? data.pages.flatMap((page) => page.results) : [];

  const handleSearch = () => {
    setQuery(search);
  };

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <div className="p-10 max-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Table className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">
          Tabla Interactiva - Beeping
        </h1>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        onSearch={handleSearch}
        placeholder="Buscar por título..."
      />
      <DataTable
        columns={columns(sortOrder, handleSortToggle)}
        data={allRows}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        isFetchingNextPage={isFetchingNextPage}
        isInitialLoading={isLoading && allRows.length === 0}
      />
    </div>
  );
}
