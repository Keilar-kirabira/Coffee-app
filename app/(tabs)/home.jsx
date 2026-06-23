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

export default function HomeScreen() {
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
  <LinearGradient
    colors={["#111111", "#313131"]}
    start={{ x: 1, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={styles.banner}
  >
    <View style={styles.promoPill}>
      <Text style={styles.promoText}>Promo</Text>
    </View>

    {/* Banner headline */}
    <Text style={styles.bannerHeadline}>
      Buy one get{"\n"}one FREE
    </Text>
     
    <Image
      source={Banner}
      style={styles.bannerImage}
      resizeMode="contain"
    />
  </LinearGradient>
</View>
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
    //  extend the search icon and word on the left side
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
  padding: 16,
  overflow: "hidden",
  justifyContent: "flex-start", // Changed from "center"
  // Remove marginHorizontal: 24
},

promoPill: {
  position: "absolute",
  top: 12, // Changed from 16
  left: 16, // Changed from 20
  backgroundColor: "#ED3140", // Changed from "#ED5151" to match Figma
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 4,
  zIndex: 2,
},

promoText: {
  color: "#FFFFFF",
  fontSize: 12,
  fontWeight: "600",
},

bannerHeadline: {
  color: "#FFFFFF",
  fontSize: 20, // Changed from 24
  fontWeight: "800",
  lineHeight: 26, // Changed from 30
  width: "60%",
  zIndex: 2,
  marginTop: 36, // Add this to push text below promo pill
},

bannerImage: {
  position: "absolute",
  right: 0, // Changed from -10
  bottom: 0, // Keep as 0
  width: 140,
  height: 140,
  resizeMode: "contain",
},
});
