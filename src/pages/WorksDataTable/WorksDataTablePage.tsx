import { useState } from "react";
import axios from "axios";
import { columns } from "./components/WorksDataTableColumns";
import { DataTable } from "@/components/DataTable/DataTable";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { useInfiniteQuery } from "@tanstack/react-query";

type GetDataParams = {
  pageParam?: number;
  queryKey: [string, string];
};

const RESULTS_PER_PAGE = 50;

const getData = async ({ pageParam = 1, queryKey }: GetDataParams) => {
  const [, search] = queryKey;
  const { data } = await axios.get("https://api.openalex.org/works", {
    params: {
      "per-page": RESULTS_PER_PAGE,
      page: pageParam,
      sort: "cited_by_count:desc",
      filter: search ? `title.search:${search}` : undefined,
    },
  });
  return {
    results: data.results,
    nextPage: pageParam + 1,
    hasMore: data.results.length === RESULTS_PER_PAGE,
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
        lastPage.hasMore ? lastPage.nextPage : undefined,
      enabled: !!query || query === "",
      initialPageParam: 1,
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
