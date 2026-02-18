import { useFetchPosts } from "@/hooks/useFetchPosts";
import React from "react";

import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { PostCard } from "./PostCard";
import PostSkeletonCard from "./PostSkeletonCard";
const ITEM_HEIGHT = 404;

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
    <FlatList
      data={posts}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      keyExtractor={(item) => `${item.id}`}
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
