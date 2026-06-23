import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

// Import images (reuse from home)
import CaffeMocha from "../../assets/images/2.png";
import FlatWhite from "../../assets/images/3.png";
import Cappuccino from "../../assets/images/5.png";
import Americano from "../../assets/images/4.png";

const { width } = Dimensions.get("window");

// Coffee data (should match home screen)
const COFFEES = [
  { id: "1", name: "Caffe Mocha", subtitle: "Deep Foam", price: "4.53", rating: "4.8", image: CaffeMocha },
  { id: "2", name: "Flat White", subtitle: "Espresso", price: "3.53", rating: "4.8", image: FlatWhite },
  { id: "3", name: "Cappuccino", subtitle: "with Oat Milk", price: "4.20", rating: "4.8", image: Cappuccino },
  { id: "4", name: "Americano", subtitle: "Black Bold", price: "3.20", rating: "4.8", image: Americano },
];

// ── Home indicator component (reused from tab layout) ──────
function HomeIndicator() {
  return (
    <View style={styles.homeIndicatorWrapper}>
      <View style={styles.homeIndicator} />
    </View>
  );
}

export default function DetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // Find the coffee by id
  const coffee = COFFEES.find(item => item.id === id);
  
  // State for size selection
  const [selectedSize, setSelectedSize] = useState("M");
  const sizes = ["S", "M", "L"];

  if (!coffee) {
    return (
      <View style={styles.errorContainer}>
        <Text>Coffee not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* ── Header with back and favorite buttons ── */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* ── Coffee Image ── */}
          <View style={styles.imageContainer}>
            <Image source={coffee.image} style={styles.coffeeImage} resizeMode="contain" />
          </View>

          {/* ── Coffee Info ── */}
          <View style={styles.infoContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.coffeeName}>{coffee.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FBBE21" />
                <Text style={styles.ratingText}>{coffee.rating}</Text>
                <Text style={styles.ratingCount}>(230)</Text>
              </View>
            </View>

            <Text style={styles.coffeeSubtitle}>{coffee.subtitle}</Text>

            {/* ── Description ── */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>
                A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo...
              </Text>
              <TouchableOpacity>
                <Text style={styles.readMore}>Read More</Text>
              </TouchableOpacity>
            </View>

            {/* ── Size Selection ── */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.sizeContainer}>
                {sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeButton,
                      selectedSize === size && styles.sizeButtonActive,
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        selectedSize === size && styles.sizeTextActive,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* ── Price and Buy Button ── */}
            <View style={styles.bottomRow}>
              <View>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.price}>$ {coffee.price}</Text>
              </View>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>

      {/* ── Home Indicator at bottom ── */}
      <HomeIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  safe: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40, // Space for home indicator
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // ── Header ──
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 12,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Image ──
  imageContainer: {
    width: "100%",
    height: width * 0.7,
    backgroundColor: "#1A1A1A",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  coffeeImage: {
    width: "80%",
    height: "80%",
  },

  // ── Info Container ──
  infoContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  coffeeName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  ratingCount: {
    fontSize: 12,
    color: "#A2A2A2",
  },
  coffeeSubtitle: {
    fontSize: 14,
    color: "#A2A2A2",
    marginBottom: 16,
  },

  // ── Section ──
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#A2A2A2",
    lineHeight: 22,
  },
  readMore: {
    fontSize: 14,
    fontWeight: "600",
    color: "#C67C4E",
    marginTop: 4,
  },

  // ── Size Selection ──
  sizeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  sizeButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    alignItems: "center",
  },
  sizeButtonActive: {
    backgroundColor: "#C67C4E",
  },
  sizeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A2A2A2",
  },
  sizeTextActive: {
    color: "#FFFFFF",
  },

  // ── Bottom Row ──
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 12,
    color: "#A2A2A2",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  buyButton: {
    backgroundColor: "#C67C4E",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 16,
  },
  buyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // ── Home Indicator ──
  homeIndicatorWrapper: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#242424",
  },
});