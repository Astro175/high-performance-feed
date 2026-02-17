import {
  authors,
  bodies,
  categories,
  dislikes,
  likes,
  titles,
  views,
} from "@/data";

export const generatePost = (id: number, likedPosts: Set<number>) => {
  return {
    id,
    title: titles[seededIndex(id, titles.length)],
    body: bodies[seededIndex(id, bodies.length)],
    author: authors[seededIndex(id, authors.length)],
    reactions: {
      likes: likedPosts.has(id)
        ? likes[seededIndex(id, likes.length)] + 1
        : likes[seededIndex(id, likes.length)],
    },
    views: views[seededIndex(id, views.length)],
    category: categories[seededIndex(id, categories.length)],
    isLiked: likedPosts.has(id),
  };
};

function seededIndex(id: number, arrayLength: number): number {
  return id % arrayLength;
}
