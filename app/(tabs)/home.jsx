import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Banner from "../../assets/images/Banner.png";

const { width } = Dimensions.get("window");

const CARD_WIDTH = (width - 48 - 12) / 2;


const CATEGORIES = ["All Coffee", "Machiato", "Latte", "Americano"];

const COFFEES = [
  {
    id: "1",
    name: "Caffe Mocha",
    subtitle: "Deep Foam",
    price: "4.53",
    rating: "4.8",
    // Replace with your image: require("../../assets/images/caffe-mocha.png")
    image: null,
  },
  {
    id: "2",
    name: "Flat White",
    subtitle: "Espresso",
    price: "3.53",
    rating: "4.8",
    // Replace with your image: require("../../assets/images/flat-white.png")
    image: null,
  },
  {
    id: "3",
    name: "Cappuccino",
    subtitle: "with Oat Milk",
    price: "4.20",
    rating: "4.8",
    // Replace with your image: require("../../assets/images/cappuccino.png")
    image: null,
  },
  {
    id: "4",
    name: "Americano",
    subtitle: "Black Bold",
    price: "3.20",
    rating: "4.8",
    // Replace with your image: require("../../assets/images/americano.png")
    image: null,
  },
];

function CoffeeCard({ item }) {
  return (
    <View style={styles.card}>
      {/* Coffee image area */}
      <View style={styles.cardImageWrapper}>
        {item.image ? (
          <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
        ) : (
          // Placeholder shown until you add real images
          <View style={styles.cardImagePlaceholder}>
            <Ionicons name="cafe-outline" size={40} color="#C67C4E" />
          </View>
        )}
 
        {/* Rating badge — top-right corner of the image */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color="#FBBE21" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
 
      {/* Text content below the image */}
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
 
        {/* Price row: price on left, + button on right */}
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>$ {item.price}</Text>
 
          {/* Add to cart button */}
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("All Coffee");

  const [search, setSearch] = useState("");
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#1A1A1A", "#1A1A1A", "#F9F9F9"]}
        locations={[0, 0.72, 1]}
        style={styles.headerGradient}
      />
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <ScrollView>
          <View style={styles.locationRow}>
            <View>
              <Text style={styles.locationLabel}>Location</Text>
              <TouchableOpacity style={styles.locationValueRow}>
                <Text style={styles.locationValue}>Bilzen, Tanjungbalai</Text>
                <Ionicons name="chevron-down" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
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
              <Ionicons name="options-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.bannerWrapper}>
            <View style={styles.banner}>
              <Image
                source={Banner}
                style={styles.bannerBackgroundImage}
                resizeMode="cover"
              />
              <View style={styles.bannerOverlay}>
                <View style={styles.promoPill}>
                  <Text style={styles.promoText}>Promo</Text>
                </View>
                <Text style={styles.bannerHeadline}>
                  Buy one get{"\n"}one FREE
                </Text>
              </View>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesContent}
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryPill,
                    isActive
                      ? styles.categoryPillActive
                      : styles.categoryPillInactive,
                  ]}
                  onPress={() => setActiveCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isActive
                        ? styles.categoryTextActive
                        : styles.categoryTextInactive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* COFFE GRID */}
                    <FlatList
            data={COFFEES}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.gridContent}
            renderItem={({ item }) => <CoffeeCard item={item} />}
          />


        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
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

  bannerWrapper: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },

  banner: {
    height: 140,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
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

  bannerOverlay: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)", // Optional: dark overlay for better text visibility
  },

  promoPill: {
    backgroundColor: "#ED5151",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 6,
  },

  promoText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  bannerHeadline: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 30,
  },

    categoriesScroll: {
    marginBottom: 20,
  },

    categoriesContent: {
    paddingHorizontal: 24,
    gap: 10,
  },

    categoryPill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },

   categoryPillActive: {
    backgroundColor: "#C67C4E",
  },

   categoryPillInactive: {
    backgroundColor: "#EDEDED",
  },

  categoryText: {
    fontSize: 13,
    fontWeight: "600",
  },

  categoryTextActive: {
    color: "#FFFFFF",
  },

   categoryTextInactive: {
    color: "#313131",
  },

    gridContent: {
    paddingHorizontal: 24,
  },
 
  // Each row in the 2-column grid
  gridRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

    card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    // Subtle card shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
 
  cardImageWrapper: {
    width: "100%",
    height: CARD_WIDTH, // square image area
    backgroundColor: "#2A2A2A",
  },
 
  cardImage: {
    width: "100%",
    height: "100%",
  },
 
  // Grey box shown when no image is provided yet
  cardImagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E",
  },
 
  // Star + number badge in top-right of image
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
    padding: 12,
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
    marginBottom: 10,
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
 
  // Small square orange + button
  addButton: {
    width: 32,
    height: 32,
    backgroundColor: "#C67C4E",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

});
