import { useState } from "react";
import axios from "axios";
import { columns } from "./components/WorksDataTableColumns";
import { DataTable } from "@/components/DataTable/DataTable";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { useInfiniteQuery } from "@tanstack/react-query";

type GetDataParams = {
  pageParam?: string;
  queryKey: [string, string];
};

const getData = async ({ pageParam = "*", queryKey }: GetDataParams) => {
  const [, search] = queryKey;
  const { data } = await axios.get("https://api.openalex.org/works", {
    params: {
      "per-page": 100,
      cursor: pageParam,
      sort: "cited_by_count:desc",
      filter: search ? `title.search:${search}` : undefined,
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["works", query],
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

  return (
    <div className="container mx-auto py-10">
      <SearchBar
        value={search}
        onChange={setSearch}
        onSearch={handleSearch}
        placeholder="Buscar por título..."
      />
      <DataTable
        columns={columns}
        data={allRows}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
