import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Maps    from "../assets/images/Maps.png";
import Profile from "../assets/images/Profile.png";
import CallIcon from "../assets/images/call-icon.png";
import Location from "../assets/images/Location.png";
import LocationBiker from "../assets/images/location-biker.png";
import Biker from "../assets/images/Bike.png";
import Favourite from "../assets/images/Favourite.png"; // NEW IMPORT

const { width, height } = Dimensions.get("window");

// true = green (done), false = grey (pending)
const STEPS = [true, true, true, false];

// ─── HomeIndicator ───────────────────────────────────────────────────────────
function HomeIndicator() {
  return (
    <View style={styles.homeIndicatorWrapper}>
      <View style={styles.homeIndicator} />
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function DeliveryScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>

      {/* ── MAP IMAGE ── */}
      <Image
        source={Maps}
        style={styles.mapImage}
        resizeMode="cover"
      />

      <View style={styles.routeContainer}>
        <View style={styles.routeVerticalLeft} />
        <View style={styles.routeHorizontalTop} />
        <View style={styles.routeVerticalRight} />
      </View>

      {/* Destination marker */}
      <Image
        source={Location}
        style={styles.locationMarker}
        resizeMode="contain"
      />

      {/* Biker marker on route */}
      <Image
        source={LocationBiker}
        style={styles.bikerMarker}
        resizeMode="contain"
      />

      {/* ── FLOATING BUTTONS — sit above the map via position absolute ── */}
      <View style={styles.topControls}>
<TouchableOpacity
  style={styles.floatBtn}
  onPress={() => {
    console.log("BACK BUTTON PRESSED");
    router.back();
  }}
>
  <Ionicons name="chevron-back" size={20} color="#1A1A1A" />
</TouchableOpacity>

        <TouchableOpacity style={[styles.floatBtn, styles.favouriteBtn]}>
          <Image 
            source={Favourite} 
            style={styles.favouriteIcon} 
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* ── BOTTOM SHEET ── */}
      <View style={styles.sheet}>

        {/* Drag indicator — centred grey pill at the very top */}
        <View style={styles.dragIndicatorWrapper}>
          <View style={styles.dragIndicator} />
        </View>

        {/* ── DELIVERY TIME ── */}
        <Text style={styles.timeText}>10 minutes left</Text>

        {/* ── DELIVERY ADDRESS ── */}
        <Text style={styles.destinationText}>
          Delivery to{" "}
          <Text style={styles.destinationBold}>Jl. Kpg Sutoyo</Text>
        </Text>

        {/* ── PROGRESS INDICATORS ── */}
        <View style={styles.progressRow}>
          {STEPS.map((active, i) => (
            <View
              key={i}
              style={[
                styles.progressBar,
                active ? styles.progressActive : styles.progressInactive,
              ]}
            />
          ))}
        </View>

        {/* ── DELIVERY STATUS CARD ── */}
        <View style={styles.statusCard}>
          <View style={styles.bikeIconBox}>
            <Image source={Biker} style={styles.statusBikeIcon} resizeMode="contain" />
          </View>

          <View style={styles.statusTextWrapper}>
            <Text style={styles.statusTitle}>Delivered your order</Text>
            <Text style={styles.statusDesc}>
              We will deliver your goods to you in the shortest possible time.
            </Text>
          </View>
        </View>

        {/* ── COURIER ROW ── */}
        <View style={styles.courierRow}>
          <Image source={Profile} style={styles.courierAvatar} />

          <View style={styles.courierInfo}>
            <Text style={styles.courierName}>Brooklyn Simmons</Text>
            <Text style={styles.courierRole}>Personal Courier</Text>
          </View>

          <TouchableOpacity style={styles.callBtn}>
            <Image source={CallIcon} style={{ width: 44, height: 44 }} />
          </TouchableOpacity>
        </View>

      </View>

      <HomeIndicator />
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const MAP_HEIGHT = height * 0.62;

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // ── Map Image ──
  mapImage: {
    width,
    height: MAP_HEIGHT,
  },

  // ── Floating Buttons ──
  topControls: {
    position: "absolute",
    top: 48,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  floatBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EDEDED",
    alignItems: "center",
    justifyContent: "center",
  },
  // NEW STYLES FOR FAVOURITE BUTTON
  favouriteBtn: {
    padding: 10,
  },
  favouriteIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },

  // ── Bottom Sheet ──
  sheet: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 8,
  },

  // ── Drag Indicator ──
  dragIndicatorWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  dragIndicator: {
    width: 45,
    height: 5,
    borderRadius: 16,
    backgroundColor: "#E3E3E3",
  },

  // ── Delivery Time ──
  timeText: {
    fontFamily: "Sora_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
    color: "#242424",
    textAlign: "center",
    marginBottom: 4,
  },

  // ── Delivery Address ──
  destinationText: {
    fontFamily: "Sora_400Regular",
    fontSize: 12,
    lineHeight: 18,
    color: "#242424",
    textAlign: "center",
    marginBottom: 16,
  },
  destinationBold: {
    fontFamily: "Sora_600SemiBold",
    fontWeight: "600",
  },

  // ── Progress Indicators ──
  progressRow: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginBottom: 8,
  },
  progressBar: {
    width: 71.25,
    height: 4,
    borderRadius: 20,
  },
  progressActive:   { backgroundColor: "#36C07E" },
  progressInactive: { backgroundColor: "#E3E3E3" },

  // ── Status Card ──
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 12,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  bikeIconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderColor:"#E3E3E3",
    alignItems: "center",
    justifyContent: "center",
  },
  statusTextWrapper: {
    flex: 1,
  },
  statusTitle: {
    fontFamily: "Sora_600SemiBold",
    fontSize: 14,
    lineHeight: 21,
    color: "#242424",
    marginBottom: 2,
  },
  statusDesc: {
    fontFamily: "Sora_300Light",
    fontSize: 12,
    lineHeight: 18,
    color: "#A2A2A2",
  },

  // ── Courier Row ──
  courierRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  courierAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
  },
  courierInfo: {
    flex: 1,
  },
  courierName: {
    fontFamily: "Sora_600SemiBold",
    fontSize: 14,
    color: "#242424",
    marginBottom: 2,
  },
  courierRole: {
    fontFamily: "Sora_400Regular",
    fontSize: 12,
    color: "#A2A2A2",
  },
  callBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  // ── Home Indicator ──
  homeIndicatorWrapper: {
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#242424",
  },

  routeContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: MAP_HEIGHT,
    zIndex: 1,
  },

  routeVerticalLeft: {
    position: 'absolute',
    backgroundColor: '#C67C4E',
    borderRadius: 100,
    width: 4,
    height: 83,
    top: 110,
    left: '19.6%',
  },

  routeHorizontalTop: {
    position: 'absolute',
    backgroundColor: '#C67C4E',
    borderRadius: 100,
    height: 4,
    width: '51%',
    top: 110,
    left: '19.5%',
  },

  routeVerticalRight: {
    position: 'absolute',
    backgroundColor: '#C67C4E',
    borderRadius: 100,
    width: 4,
    height: 182,
    top: 110,
    left: '70%',
  },

  locationMarker: {
    position: 'absolute',
    width: 19,
    height: 19,
    top: 195,
    left: '17%',
    zIndex: 3,
  },

  bikerMarker: {
    position: 'absolute',
    width: 19,
    height: 19,
    top: 292,
    left: '68%',
    zIndex: 3,
  },

  statusBikeIcon: {
    width: 28,
    height: 28,
  },
});