import { PostCard } from "@/components/PostCard";
import { fireEvent, render, screen } from "@testing-library/react-native";

const mockLike = jest.fn();
const mockUnlike = jest.fn();

jest.mock("@/hooks/usePostMutations", () => ({
  useLikePost: jest.fn(() => ({
    mutate: mockLike,
  })),
  useUnlikePost: jest.fn(() => ({
    mutate: mockUnlike,
  })),
}));

jest.mock("expo-image", () => ({
  Image: "Image",
}));

const post = {
  id: 4,
  title: "new post",
  body: "Some item goes in here",
  author: "Charlie cox",
  reactions: {
    likes: 4,
  },
  views: 44,
  category: "software engineering",
  isLiked: false,
};
const likedPost = { ...post, isLiked: true };

describe("PostCard", () => {
  beforeEach(() => {
    mockLike.mockClear();
    mockUnlike.mockClear();
  });
  it("renders post title and author", () => {
    render(<PostCard post={post} />);
    expect(screen.getByText("new post")).toBeTruthy();
    expect(screen.getByText("By Charlie cox")).toBeTruthy();
  });
  it("Calls like when post is not liked", () => {
    render(<PostCard post={post} />);
    fireEvent.press(screen.getByText("👍 4"));
    expect(mockLike).toHaveBeenCalled();
  });
  it("Calls unlike when post is liked", () => {
    render(<PostCard post={likedPost} />);
    fireEvent.press(screen.getByText("👍 4"));
    expect(mockUnlike).toHaveBeenCalled();
  });
  it("renders post category, likes, and views", () => {
    render(<PostCard post={post} />);
    expect(screen.getByText("software engineering")).toBeTruthy();
    expect(screen.getByText("👍 4")).toBeTruthy();
    expect(screen.getByText("👁 44")).toBeTruthy();
  });
});
