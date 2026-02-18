import React from "react";
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

type Props = {
  label: string;
  value: string | undefined;
  selectedValue: string | undefined;
  setSelectedValue: (value: string | undefined) => void;
};

export default function CategoryChip({
  label,
  value,
  selectedValue,
  setSelectedValue,
}: Props) {
  const isActive = selectedValue === value;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setSelectedValue?.(value)}
      style={[styles.chip, isActive && styles.activeChip]}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
}

type Style = {
  chip: ViewStyle;
  activeChip: ViewStyle;
  text: TextStyle;
  activeText: TextStyle;
};

const styles = StyleSheet.create<Style>({
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activeChip: {
    backgroundColor: "#111827",
    borderColor: "#111827",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    textTransform: "capitalize",
  },
  activeText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
