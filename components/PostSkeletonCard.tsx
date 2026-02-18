import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function PostSkeletonCard() {
  return (
    <View style={styles.card}>
      <Skeleton width="100%" height={180} radius={0} colorMode="light" />

      <View style={styles.header}>
        <Skeleton width={80} height={24} radius={20} colorMode="light" />
        <Skeleton width={80} height={14} radius={6} colorMode="light" />
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <Skeleton width="90%" height={18} radius={6} colorMode="light" />
        <View style={{ height: 6 }} />
        <Skeleton width="70%" height={18} radius={6} colorMode="light" />
      </View>
      <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
        <Skeleton width="100%" height={14} radius={6} colorMode="light" />
        <View style={{ height: 6 }} />
        <Skeleton width="95%" height={14} radius={6} colorMode="light" />
        <View style={{ height: 6 }} />
        <Skeleton width="85%" height={14} radius={6} colorMode="light" />
      </View>
      <View style={styles.footer}>
        <Skeleton width={60} height={14} radius={6} colorMode="light" />
        <Skeleton width={40} height={14} radius={6} colorMode="light" />
      </View>
    </View>
  );
}

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
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 14,
    marginTop: 16,
  },
});
