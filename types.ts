export type Post = {
  id: number;
  title: string;
  body: string;
  author: string;
  reactions: {
    likes: number;
  };
  views: number;
  category: string;
  isLiked: boolean;
};
