import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchPosts = (query?: string) => {
  return useInfiniteQuery({
    queryKey: ["posts", query],
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      const baseUrl = query ? `/api/posts/search?q=${query}` : `/api/posts`;
      const separator = query ? "&" : "?";
      return fetch(
        `${baseUrl}${separator}limit=10${pageParam ? `&cursor=${pageParam}` : ""}`,
      ).then((res) => res.json());
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
