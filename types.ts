export type Post = {
  id: number;
  title: string;
  body: string;
  author: string;
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  category: string;
};
