import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

// ── Images ────────────────────────────────────────────────────
import Banner     from "../../assets/images/Banner.png";
import CaffeMocha from "../../assets/images/2.png";
import FlatWhite  from "../../assets/images/3.png";
import Cappuccino from "../../assets/images/5.png";
import Americano  from "../../assets/images/4.png";

// ── Custom Figma icon ─────────────────────────────────────────
import FiletIcon from "../../assets/images/Filet.png";

const { width } = Dimensions.get("window");
const CARD_WIDTH = 156;
const CARD_HEIGHT = 238;

const CATEGORIES = ["All Coffee", "Machiato", "Latte", "Americano"];

const COFFEES = [
  { id: "1", name: "Caffe Mocha",  subtitle: "Deep Foam",     price: "4.53", rating: "4.8", image: CaffeMocha },
  { id: "2", name: "Flat White",   subtitle: "Espresso",      price: "3.53", rating: "4.8", image: FlatWhite  },
  { id: "3", name: "Cappuccino",   subtitle: "with Oat Milk", price: "4.20", rating: "4.8", image: Cappuccino },
  { id: "4", name: "Americano",    subtitle: "Black Bold",    price: "3.20", rating: "4.8", image: Americano  },
];

// ── Coffee card ───────────────────────────────────────────────
function CoffeeCard({ item, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.card}
    >
      <View style={styles.cardImageWrapper}>
        {item.image ? (
          <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
        ) : (
          <View style={styles.cardImagePlaceholder}>
            <Ionicons name="cafe-outline" size={40} color="#C67C4E" />
          </View>
        )}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color="#FBBE21" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>$ {item.price}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All Coffee");
  const [search, setSearch] = useState("");

  return (
    <View style={styles.root}>

      {/* Dark background behind header area */}
      <LinearGradient
        colors={["#1A1A1A", "#1A1A1A", "#1A1A1A"]}
        style={styles.headerGradient}
      />

      <SafeAreaView style={styles.safe} edges={["top"]}>

        {/* ── FIXED HEADER — never scrolls ──────────────────── */}
        <View style={styles.fixedHeader}>

          {/* Location */}
          <View style={styles.locationRow}>
            <View>
              <Text style={styles.locationLabel}>Location</Text>
              <TouchableOpacity style={styles.locationValueRow}>
                <Text style={styles.locationValue}>Bilzen, Tanjungbalai</Text>
                <Ionicons name="chevron-down" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search */}
          <View style={styles.searchRow}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="white" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search coffee"
                placeholderTextColor="#A2A2A2"
                value={search}
                onChangeText={setSearch}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Image source={FiletIcon} style={styles.filterIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>

          {/* Banner */}
          <View style={styles.bannerWrapper}>
            <View style={styles.banner}>
              <Image
                source={Banner}
                style={styles.bannerBackgroundImage}
                resizeMode="cover"
              />
              <View style={styles.bannerContent}>
                <View style={styles.promoPill}>
                  <Text style={styles.promoText}>Promo</Text>
                </View>
                <View style={styles.headlineWrapper}>
                  <View style={styles.headlineLine}>
                    <Text style={styles.bannerHeadline}>Buy one get</Text>
                  </View>
                  <View style={styles.headlineLine}>
                    <Text style={styles.bannerHeadline}>one FREE</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Categories — fixed, cards scroll under these */}
          <FlatList
            data={CATEGORIES}
            keyExtractor={(cat) => cat}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesContent}
            renderItem={({ item: cat }) => {
              const isActive = cat === activeCategory;
              return (
                <TouchableOpacity
                  style={[
                    styles.categoryPill,
                    isActive ? styles.categoryPillActive : styles.categoryPillInactive,
                  ]}
                  onPress={() => setActiveCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isActive ? styles.categoryTextActive : styles.categoryTextInactive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

        </View>

        {/* ── SCROLLABLE CARDS GRID ─────────────────────────── */}
        <FlatList
          data={COFFEES}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CoffeeCard
              item={item}
              onPress={() => router.push(`/detail/${item.id}`)}
            />
          )}
        />

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  // ── Root ───────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 280,
  },

  safe: {
    flex: 1,
  },

  // ── Fixed header container ──────────────────────────────────
  fixedHeader: {
    backgroundColor: "transparent",
  },

  // ── Location ───────────────────────────────────────────────
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 24,
  },

  locationLabel: {
    color: "#A2A2A2",
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 4,
  },

  locationValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  locationValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // ── Search ─────────────────────────────────────────────────
  searchRow: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },

  searchBar: {
    flex: 1,
    height: 52,
    backgroundColor: "#2A2A2A",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },

  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
  },

  filterButton: {
    width: 52,
    height: 52,
    backgroundColor: "#C67C4E",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  filterIcon: {
    width: 46,
    height: 46,
  },

  // ── Banner ─────────────────────────────────────────────────
  bannerWrapper: {
    paddingHorizontal: 24,
    marginBottom: 2,
  },

  banner: {
    height: 140,
    borderRadius: 16,
    overflow: "hidden",
  },

  bannerBackgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },

  bannerContent: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },

  promoPill: {
    backgroundColor: "#ED5151",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 14,
  },

  promoText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  headlineWrapper: {
    gap: 10,
    alignItems: "flex-start",
  },

  headlineLine: {
    backgroundColor: "#000000",
    paddingHorizontal: 4,
    paddingTop: 8,
    alignSelf: "flex-start",
  },

  bannerHeadline: {
    fontFamily: "Sora_600SemiBold",
    fontWeight: "600",
    fontSize: 32,
    lineHeight: 34,
    color: "#FFFFFF",
    marginTop: -18,
  },

  // ── Categories ─────────────────────────────────────────────
  categoriesScroll: {
    marginTop: 19,
    marginBottom: 10,
  },

  categoriesContent: {
    paddingHorizontal: 24,

    gap: 10,
  },

  categoryPill: {
    width: 87,
    height: 29,
    borderRadius: 6,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryPillActive:   { backgroundColor: "#C67C4E" },
  categoryPillInactive: { backgroundColor: "#EDEDED" },

  categoryText: {
    fontFamily: "Sora_600SemiBold",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 21,
  },

  categoryTextActive:   { color: "#FFFFFF" },
  categoryTextInactive: { color: "#313131" },

  // ── Grid ───────────────────────────────────────────────────
  gridContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 120,
  },

  gridRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

  // ── Card ───────────────────────────────────────────────────
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    padding: 8,
    paddingBottom: 12,
  },

  cardImageWrapper: {
    width: "100%",
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  cardImagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0E6DC",
  },

  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },

  ratingText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },

  cardBody: {
    paddingTop: 8,
  },

  cardName: {
    color: "#1A1A1A",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },

  cardSubtitle: {
    color: "#A2A2A2",
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 8,
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardPrice: {
    color: "#1A1A1A",
    fontSize: 16,
    fontWeight: "700",
  },

  addButton: {
    width: 32,
    height: 32,
    backgroundColor: "#C67C4E",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});