import { Post } from "@/types";
import { useMutation } from "@tanstack/react-query";

type pages = { data: Post[]; nextCursor: number }[];
type PostsInCache = { pages: pages };

export const useLikePost = (id: number) => {
  return useMutation({
    mutationFn: async () => {
      return fetch(`/api/posts/${id}/like`, { method: "POST" }).then((res) =>
        res.json(),
      );
    },
    onMutate: async (newTodo, context) => {
      await context.client.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = context.client.getQueryData(["posts"]);
      context.client.setQueryData(["posts"], (oldData: PostsInCache) => {
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: page.data.map((post) =>
              post.id === id
                ? {
                    ...post,
                    reactions: {
                      ...post.reactions,
                      likes: post.reactions.likes + 1,
                    },
                    isLiked: true,
                  }
                : post,
            ),
          })),
        };
      });
      return { previousPosts };
    },
    onError: (err, newPost, onMutateResult, context) => {
      context.client.setQueryData(["posts"], onMutateResult?.previousPosts);
    },
    onSettled: (data, error, variables, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUnlikePost = (id: number) => {
  return useMutation({
    mutationFn: async () => {
      return fetch(`/api/posts/${id}/unlike`, { method: "POST" }).then((res) =>
        res.json(),
      );
    },
    onMutate(variables, context) {
      context.client.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = context.client.getQueryData(["posts"]);

      context.client.setQueryData(["posts"], (oldData: PostsInCache) => {
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: page.data.map((post) =>
              post.id === id
                ? {
                    ...post,
                    reactions: {
                      ...post.reactions,
                      likes: post.reactions.likes - 1,
                    },
                    isLiked: false,
                  }
                : post,
            ),
          })),
        };
      });
      return { previousPosts };
    },
    onError(error, variables, onMutateResult, context) {
      context.client.setQueryData(["posts"], onMutateResult?.previousPosts);
    },
    onSettled(data, error, variables, onMutateResult, context) {
      context.client.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
