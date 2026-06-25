import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";

// ── Coffee images ─────────────────────────────────────────────
import CaffeMocha from "../../assets/images/2.png";
import FlatWhite  from "../../assets/images/3.png";
import Cappuccino from "../../assets/images/5.png";
import Americano  from "../../assets/images/4.png";

// ── Feature icons ─────────────────────────────────────────────
import FastDelivery from "../../assets/images/FastDelivery.png";
import QualityBean  from "../../assets/images/QualityBean.png";
import ExtraMilk    from "../../assets/images/ExtraMilk.png";

// ── Header icons ──────────────────────────────────────────────
import FavouritesIcon from "../../assets/images/favorites.png";

const { width } = Dimensions.get("window");

const COFFEES = [
  { id: "1", name: "Caffe Mocha", subtitle: "Ice/Hot", price: "4.53", rating: "4.8", image: CaffeMocha },
  { id: "2", name: "Flat White",  subtitle: "Ice/Hot", price: "3.53", rating: "4.8", image: FlatWhite  },
  { id: "3", name: "Cappuccino",  subtitle: "Ice/Hot", price: "4.20", rating: "4.8", image: Cappuccino },
  { id: "4", name: "Americano",   subtitle: "Ice/Hot", price: "3.20", rating: "4.8", image: Americano  },
];

export default function DetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const coffee = COFFEES.find((item) => item.id === id);
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

        {/* ── Header ─────────────────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.headerSideButton}
          >
            <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Detail</Text>

          <TouchableOpacity style={styles.headerSideButton}>
            <Image
              source={FavouritesIcon}
              style={styles.favouriteIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* ── Scrollable content ──────────────────────────────── */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* ── Coffee Image ────────────────────────────────── */}
          <View style={styles.imageWrapper}>
            <Image
              source={coffee.image}
              style={styles.coffeeImage}
              resizeMode="cover"
            />
          </View>

          {/* ── Info Section ────────────────────────────────── */}
          <View style={styles.infoSection}>

            {/* Name row + feature icons */}
            <View style={styles.nameRow}>
              <View style={styles.nameBlock}>
                <Text style={styles.coffeeName}>{coffee.name}</Text>
                <Text style={styles.coffeeSubtitle}>{coffee.subtitle}</Text>
              </View>
              <View style={styles.featureIcons}>
                <View style={styles.featureIconBox}>
                  <Image source={FastDelivery} style={styles.featureIcon} resizeMode="contain" />
                </View>
                <View style={styles.featureIconBox}>
                  <Image source={QualityBean} style={styles.featureIcon} resizeMode="contain" />
                </View>
                <View style={styles.featureIconBox}>
                  <Image source={ExtraMilk} style={styles.featureIcon} resizeMode="contain" />
                </View>
              </View>
            </View>

            {/* Rating */}
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#FBBE21" />
              <Text style={styles.ratingValue}>{coffee.rating}</Text>
              <Text style={styles.ratingCount}>(230)</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>
                A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo...{" "}
                <Text style={styles.readMore}>Read More</Text>
              </Text>
            </View>

            {/* Size */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.sizeRow}>
                {sizes.map((size) => {
                  const isActive = selectedSize === size;
                  return (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.sizeButton,
                        isActive ? styles.sizeButtonActive : styles.sizeButtonInactive,
                      ]}
                      onPress={() => setSelectedSize(size)}
                    >
                      <Text
                        style={[
                          styles.sizeText,
                          isActive ? styles.sizeTextActive : styles.sizeTextInactive,
                        ]}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

          </View>
        </ScrollView>

        {/* ── Fixed Bottom Bar ────────────────────────────────── */}
        <View style={styles.bottomBar}>
          <View style={styles.priceBlock}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>$ {coffee.price}</Text>
          </View>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() =>
              router.push({
                pathname: "/order",
                params: { id: coffee.id, size: selectedSize },
              })
            }
          >
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>

      {/* ── Home indicator ──────────────────────────────────── */}
      <View style={styles.homeIndicatorWrapper}>
        <View style={styles.homeIndicator} />
      </View>
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

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // ── Header ─────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },

  headerSideButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontFamily: "Sora_600SemiBold",
    fontWeight: "600",
    fontSize: 18,
    color: "#242424",
  },

  favouriteIcon: {
    width: 24,
    height: 24,
  },

  // ── Scroll ─────────────────────────────────────────────────
  scrollContent: {
    paddingBottom: 140,
  },

  // ── Coffee Image ───────────────────────────────────────────
  imageWrapper: {
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: "hidden",
    height: width * 0.68,
    backgroundColor: "#E8E8E8",
  },

  coffeeImage: {
    width: "100%",
    height: "100%",
  },

  // ── Info Section ───────────────────────────────────────────
  infoSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
  },

  // Name row
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  nameBlock: {
    flex: 1,
    marginRight: 12,
  },

  coffeeName: {
    fontFamily: "Sora_600SemiBold",
    fontWeight: "600",
    fontSize: 20,
    color: "#242424",
    marginBottom: 4,
  },

  coffeeSubtitle: {
    fontFamily: "Sora_400Regular",
    fontWeight: "400",
    fontSize: 12,
    color: "#A2A2A2",
  },

  // Feature icons
  featureIcons: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  featureIconBox: {
    width: 44,
    height: 44,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  featureIcon: {
    width: 44,
    height: 44,
  },

  // Rating
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 16,
  },

  ratingValue: {
    fontFamily: "Sora_600SemiBold",
    fontWeight: "600",
    fontSize: 14,
    color: "#242424",
  },

  ratingCount: {
    fontFamily: "Sora_400Regular",
    fontSize: 12,
    color: "#A2A2A2",
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: "#EDEDED",
    marginBottom: 20,
  },

  // Section
  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontFamily: "Sora_600SemiBold",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,           // 150% of 16px
    color: "#242424",
    marginBottom: 8,
  },

  description: {
    fontFamily: "Sora_300Light",
    fontWeight: "300",
    fontSize: 14,
    lineHeight: 21,           // 150% of 14px
    color: "#A2A2A2",
  },

  readMore: {
    fontFamily: "Sora_600SemiBold",
    fontWeight: "600",
    fontSize: 14,
    color: "#C67C4E",
  },

  // Size buttons
  sizeRow: {
    flexDirection: "row",
    gap: 12,
  },

  sizeButton: {
    flex: 1,
    height: 41,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  sizeButtonActive: {
    backgroundColor: "#FFF5EE",
    borderColor: "#C67C4E",
  },

  sizeButtonInactive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DEDEDE",
  },

  sizeText: {
    fontFamily: "Sora_600SemiBold",
    fontWeight: "600",
    fontSize: 14,
  },

  sizeTextActive: {
    color: "#C67C4E",
  },

  sizeTextInactive: {
    color: "#A2A2A2",
  },

  // ── Fixed Bottom Bar ───────────────────────────────────────
  bottomBar: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius:40,

  height: 116,
  paddingTop: 16,
  paddingHorizontal: 24,
  paddingBottom: 46,

  backgroundColor: "#FFFFFF",

  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
},

  priceBlock: {
    gap: 2,
  },

  priceLabel: {
    fontFamily: "Sora_400Regular",
    fontSize: 12,
    color: "#A2A2A2",
  },

  priceValue: {
    fontFamily: "Sora_600SemiBold",
    fontWeight: "600",
    fontSize: 24,
    color: "#C67C4E",
  },

  buyButton: {
    flex: 1,
    marginLeft: 24,
    height: 56,
    backgroundColor: "#C67C4E",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  buyButtonText: {
    fontFamily: "Sora_600SemiBold",
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
  },

  // ── Home Indicator ─────────────────────────────────────────
  homeIndicatorWrapper: {
    alignItems: "center",
    paddingBottom: 8,
    backgroundColor: "#F9F2EC",
  },

  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#242424",
  },
});