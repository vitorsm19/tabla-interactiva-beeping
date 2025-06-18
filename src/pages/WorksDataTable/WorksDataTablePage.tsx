import { useEffect, useState } from "react";
import axios from "axios";
import { columns, type Work } from "./components/WorksDataTableColumns";
import { DataTable } from "@/components/DataTable/DataTable";
import { SearchBar } from "@/components/SearchBar/SearchBar";

const getData = async (search: string): Promise<Work[]> => {
  const { data } = await axios.get("https://api.openalex.org/works", {
    params: {
      "per-page": 20,
      page: 1,
      sort: "cited_by_count:desc",
      filter: search ? `title.search:${search}` : undefined,
    },
  });
  return data.results;
};

export default function WorksDataTablePage() {
  const [data, setData] = useState<Work[]>([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getData(query).then(setData).catch(console.error);
  }, [query]);

  return (
    <div className="container mx-auto py-10">
      <SearchBar
        value={search}
        onChange={setSearch}
        onSearch={() => setQuery(search)}
        placeholder="Buscar por título..."
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
