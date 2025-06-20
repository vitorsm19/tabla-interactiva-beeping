import { useState } from "react";
import axios from "axios";
import { columns } from "./components/WorksDataTableColumns";
import { DataTable } from "@/components/DataTable/DataTable";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Table } from "lucide-react";

type GetDataParams = {
  pageParam?: string;
  queryKey: [string, string, string];
};

const getData = async ({ pageParam = "*", queryKey }: GetDataParams) => {
  const [, search, sortOrder] = queryKey;
  const { data } = await axios.get("https://api.openalex.org/works", {
    params: {
      "per-page": 20,
      cursor: pageParam,
      sort: sortOrder === "desc" ? "cited_by_count:desc" : "cited_by_count",
      filter: search ? `default.search:${search}` : undefined,
    },
  });

  return {
    results: data.results,
    nextCursor: data.meta.next_cursor,
    hasMore: !!data.meta.next_cursor,
  };
};

export default function WorksDataTablePage() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["works", query, sortOrder],
      queryFn: getData,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextCursor : undefined,
      enabled: !!query || query === "",
      initialPageParam: "*",
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
