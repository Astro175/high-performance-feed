import { Post } from "@/types";
import { createServer } from "miragejs";
import { generatePost } from "./generator";

export const makeServer = ({ environment = "test" } = {}) => {
  const likedPosts = new Set<number>();
  let server = createServer({
    routes() {
      this.namespace = "api";
      this.timing = 1000; // 1 second delay
      this.get("/posts", (schema, request) => {
        const limit = request.queryParams.limit
          ? Number(request.queryParams.limit)
          : 20;
        const cursor = request.queryParams.cursor
          ? Number(request.queryParams.cursor)
          : null;

        const startId = cursor ? cursor + 1 : 1;
        const endId = Math.min(startId + limit - 1, 10000);
        const data: Post[] = [];

        if (startId > 10000) {
          return { data: [], nextCursor: null };
        }
        for (let i = startId; i <= endId; i++) {
          const post = generatePost(i, likedPosts);
          data.push(post);
        }
        const nextCursor = endId >= 10000 ? null : endId;
        return { data, nextCursor };
      });
      this.get("/posts/search", (schema, request) => {
        const query = request.queryParams.q as string;
        const category = request.queryParams.category as string;
        const cursor = request.queryParams.cursor
          ? Number(request.queryParams.cursor)
          : null;
        const limit = request.queryParams.limit
          ? Number(request.queryParams.limit)
          : 20;
        let searchResults = [];

        for (let i = 1; i <= 10000; i++) {
          const post = generatePost(i, likedPosts);
          const matchesQuery =
            !query || post.title.toLowerCase().includes(query.toLowerCase());
          const matchesCategory =
            !category || post.category.toLowerCase() === category.toLowerCase();

          if (matchesQuery && matchesCategory) {
            searchResults.push(post);
          }
        }
        const startIndex = cursor ? cursor : 0;
        if (startIndex > searchResults.length) {
          return { data: [], nextCursor: null };
        }
        const endIndex = Math.min(limit + startIndex, searchResults.length);
        const data = searchResults.slice(startIndex, endIndex);
        return {
          data,
          nextCursor: endIndex >= searchResults.length ? null : endIndex,
        };
      });
      this.post("/posts/:id/like", (schema, request) => {
        const likedPostId = Number(request.params.id);
        likedPosts.add(likedPostId);
        return generatePost(likedPostId, likedPosts);
      });
      this.post("/posts/:id/unlike", (schema, request) => {
        const unlikePostId = Number(request.params.id);
        likedPosts.delete(unlikePostId);
        return generatePost(unlikePostId, likedPosts);
      });
    },
  });
  return server;
};
