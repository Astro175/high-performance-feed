import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchPosts = (query?: string, category?: string) => {
  return useInfiniteQuery({
    queryKey: ["posts", query, category],
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      let url = "/api/posts";
      const params = new URLSearchParams();
      if (query) params.append("q", query);
      if (category) params.append("category", category);
      params.append("limit", "10");
      if (pageParam) params.append("cursor", pageParam);

      const hasSearchParam = query || category;
      if (hasSearchParam) url = "/api/posts/search";

      return fetch(`${url}?${params.toString()}`).then((res) => res.json());
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
