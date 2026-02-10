import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchPosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      return fetch(
        `/api/posts?limit=10${pageParam ? `&cursor=${pageParam}` : ""}`,
      ).then((res) => res.json());
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
