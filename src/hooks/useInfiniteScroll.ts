import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface UseOpenAlexInfiniteQueryOptions {
    endpoint: string;
    queryKey: (string | number | boolean)[];
    searchParam?: string;
    sortParam?: string;
    enabled?: boolean;
    perPage?: number;
}

export function useOpenAlexInfiniteQuery({
    endpoint,
    queryKey,
    searchParam,
    sortParam,
    enabled = true,
    perPage = 20,
}: UseOpenAlexInfiniteQueryOptions) {
    return useInfiniteQuery({
        queryKey,
        queryFn: async ({ pageParam = "*" }) => {
            const { data } = await axios.get(endpoint, {
                params: {
                    "per-page": perPage,
                    cursor: pageParam,
                    sort: sortParam,
                    filter: searchParam,
                },
            });
            return {
                results: data.results,
                nextCursor: data.meta.next_cursor,
                hasMore: !!data.meta.next_cursor,
            };
        },
        getNextPageParam: (lastPage) =>
            lastPage.hasMore ? lastPage.nextCursor : undefined,
        enabled,
        initialPageParam: "*",
    });
}

// export function useAnotherApiInfiniteQuery({ ...
// example
