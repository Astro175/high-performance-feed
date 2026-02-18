import CategoryChip from "@/components/CategoryChip";
import PostList from "@/components/PostList";
import { categories } from "@/data";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const { data } = useFetchPosts(debouncedSearch, selectedCategory);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search posts..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
        />
      </View>
      <ScrollView
        horizontal={true}
        style={{ height: 50, paddingHorizontal: 16, marginBottom: 16 }}
      >
        <CategoryChip
          label="All"
          value={undefined}
          selectedValue={selectedCategory}
          setSelectedValue={setSelectedCategory}
        />
        {categories.map((category) => (
          <CategoryChip
            key={category}
            label={category}
            value={category}
            selectedValue={selectedCategory}
            setSelectedValue={setSelectedCategory}
          />
        ))}
      </ScrollView>
      <PostList searchQuery={debouncedSearch} categoryFilter={selectedCategory}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  searchWrapper: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 8,

    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    // Android Elevation
    elevation: 4,
  },
  input: {
    fontSize: 16,
    color: "#111827",
  },
});
