import { useLikePost, useUnlikePost } from "@/hooks/usePostMutations";
import { Post } from "@/types";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PostCardComponent = ({ post }: { post: Post }) => {
  const imageUrl = `https://picsum.photos/seed/${post.id}/400/300`;
  const { mutate: like } = useLikePost(post.id);
  const { mutate: unlike } = useUnlikePost(post.id);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        contentFit="cover"
        placeholder={{ blurhash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH" }}
        transition={200}
      />

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
          <TouchableOpacity onPress={() => (post.isLiked ? unlike() : like())}>
            <Text style={styles.reactionText}>👍 {post.reactions.likes}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.views}>👁 {post.views}</Text>
      </View>
    </View>
  );
};

export const PostCard = React.memo(PostCardComponent);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    overflow: "hidden", // ensures image follows rounded corners
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#E5E7EB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
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
    paddingHorizontal: 16,
    lineHeight: 24,
    height: 48,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4B5563",
    marginBottom: 12,
    paddingHorizontal: 16,
    height: 60,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 14,
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
