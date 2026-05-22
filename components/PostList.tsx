import { useFetchPosts } from "@/hooks/useFetchPosts";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Text, View } from "react-native";
import { PostCard } from "./PostCard";
import PostSkeletonCard from "./PostSkeletonCard";


const PostList = ({
  searchQuery,
  categoryFilter,
}: {
  searchQuery?: string;
  categoryFilter?: string;
}) => {
  const {
    data,
    hasNextPage,
    status,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    refetch,
    error,
  } = useFetchPosts(searchQuery, categoryFilter);
  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  if (status === "pending") {
    return (
      <View>
        {Array.from({ length: 4 }).map((_, index) => (
          <PostSkeletonCard key={index} />
        ))}
      </View>
    );
  }

  if (status === "error") {
    console.log(error);
    return <Text>Something went wrong...</Text>;
  }

  return (
    <FlashList
      data={posts}
      onRefresh={() => {
        refetch();
      }}
      refreshing={isRefetching}
      renderItem={({ item }) => <PostCard post={item} />}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.7}
      ListFooterComponent={() => {
        if (!hasNextPage) {
          return null;
        }
        return <ActivityIndicator size="large" />;
      }}
    />
  );
};

export default PostList;
