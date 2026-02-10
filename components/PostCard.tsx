import React from "react";
import { View, Text, StyleSheet } from "react-native";

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

type PostProps = {
  post: Post;
};

export const PostCard = ({ post }: PostProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{post.category}</Text>
        </View>
        <Text style={styles.author}>By {post.author}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {post.title}
      </Text>
      <Text style={styles.body} numberOfLines={3}>
        {post.body}
      </Text>
      <View style={styles.footer}>
        <View style={styles.reactions}>
          <Text style={styles.reactionText}>
            👍 {post.reactions.likes}
          </Text>
          <Text style={styles.reactionText}>
            👎 {post.reactions.dislikes}
          </Text>
        </View>
        <Text style={styles.views}>👁 {post.views}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: "#E8F1FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563EB",
  },
  author: {
    fontSize: 12,
    color: "#6B7280",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4B5563",
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
  },
  reactions: {
    flexDirection: "row",
    gap: 16,
  },
  reactionText: {
    fontSize: 13,
    color: "#374151",
  },
  views: {
    fontSize: 13,
    color: "#374151",
  },
});