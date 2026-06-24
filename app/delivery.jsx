// ─────────────────────────────────────────────────────────────────────────────
// app/delivery.jsx  –  Delivery Tracking Screen (image-based map)
// ─────────────────────────────────────────────────────────────────────────────

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// useRouter — lets us call router.back() when the back button is tapped.
// Without this, the back button would be a TouchableOpacity that does nothing.
import { useRouter } from "expo-router";

// Ionicons          — chevron-back, locate-outline, call-outline
// MaterialCommunityIcons — moped icon for the status card
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Maps    — the Figma map screenshot used as the top section background
// Profile — the courier's profile photo
import Maps    from "../assets/images/Maps.png";
import Profile from "../assets/images/Profile.png";

// ─── Screen dimensions ───────────────────────────────────────────────────────
// width  → makes the map image stretch edge-to-edge
// height → lets us calculate the map image height as a % of the screen
const { width, height } = Dimensions.get("window");

// ─── Progress bar data ───────────────────────────────────────────────────────
// true  = green  (step completed)
// false = grey   (step pending)
// .map() below turns this into 4 coloured bars automatically
const STEPS = [true, true, true, false];

// ─── HomeIndicator ───────────────────────────────────────────────────────────
// Thin black pill at the very bottom — matches every other screen in the app
function HomeIndicator() {
  return (
    <View style={styles.homeIndicatorWrapper}>
      <View style={styles.homeIndicator} />
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function DeliveryScreen() {

  // router.back() navigates back to OrderScreen when the chevron is tapped
  const router = useRouter();

  return (
    <View style={styles.root}>

      {/* ── MAP IMAGE ──────────────────────────────────────────────────────
          The Figma map screenshot fills the entire top section.
          resizeMode="cover" makes it fill the box without distorting,
          cropping the edges if needed — same as CSS object-fit: cover.   */}
      <Image
        source={Maps}
        style={styles.mapImage}
        resizeMode="cover"
      />

      {/* ── FLOATING BUTTONS ───────────────────────────────────────────────
          position: "absolute" lifts these out of the normal layout flow
          so they sit ON TOP of the map image without pushing it down.
          top / left / right anchor them to the screen edges.             */}
      <View style={styles.topControls}>

        {/* Back button — top-left — returns to OrderScreen */}
        <TouchableOpacity
          style={styles.floatBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={22} color="#1A1A1A" />
        </TouchableOpacity>

        {/* Location button — top-right — re-centres the map (UI only for now) */}
        <TouchableOpacity style={styles.floatBtn}>
          <Ionicons name="locate-outline" size={22} color="#1A1A1A" />
        </TouchableOpacity>

      </View>

      {/* ── BOTTOM SHEET ───────────────────────────────────────────────────
          White card that slides up over the bottom of the map image.
          borderTopLeftRadius + borderTopRightRadius give the rounded top
          corners you see in the Figma.
          marginTop: -24 pulls the card up to overlap the map edge so there
          is no gap between the image and the card.                        */}
      <View style={styles.sheet}>

        {/* ── DRAG INDICATOR ──
            Centred grey pill at the very top of the card.
            Visual hint that the sheet is draggable (even if not wired up). */}
        <View style={styles.dragIndicatorWrapper}>
          <View style={styles.dragIndicator} />
        </View>

        {/* ── DELIVERY TIME ── */}
        <Text style={styles.timeText}>10 minutes left</Text>

        {/* ── DELIVERY ADDRESS ──
            "Delivery to " is regular weight.
            "Jl. Kpg Sutoyo" is bold.
            Nesting <Text> inside <Text> applies inline styles — the inner
            Text inherits font size and color but overrides fontWeight.
            {" "} inserts the space between the two words.                */}
        <Text style={styles.destinationText}>
          Delivery to{" "}
          <Text style={styles.destinationBold}>Jl. Kpg Sutoyo</Text>
        </Text>

        {/* ── PROGRESS INDICATORS ──
            STEPS.map() loops over [true, true, true, false].
            For each value it renders one bar.
            The ternary picks progressActive (green) or progressInactive (grey).
            key={i} is required so React can track each bar efficiently.  */}
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

          {/* Left — moped icon inside a warm beige rounded square */}
          <View style={styles.bikeIconBox}>
            <MaterialCommunityIcons name="moped" size={32} color="#C67C4E" />
          </View>

          {/* Right — title + description
              flex: 1 makes this column expand to fill the remaining width
              so the text never overflows onto the icon box               */}
          <View style={styles.statusTextWrapper}>
            <Text style={styles.statusTitle}>Delivered your order</Text>
            <Text style={styles.statusDesc}>
              We will deliver your goods to you in the shortest possible time.
            </Text>
          </View>

        </View>

        {/* ── COURIER SECTION ── */}
        <View style={styles.courierRow}>

          {/* Profile photo — local image imported at the top */}
          <Image source={Profile} style={styles.courierAvatar} />

          {/* Name + role
              flex: 1 stretches this block to fill the space between the
              avatar and the call button, pushing the button to the right  */}
          <View style={styles.courierInfo}>
            <Text style={styles.courierName}>Brooklyn Simmons</Text>
            <Text style={styles.courierRole}>Personal Courier</Text>
          </View>

          {/* Call button — outlined square with phone icon */}
          <TouchableOpacity style={styles.callBtn}>
            <Ionicons name="call-outline" size={20} color="#1A1A1A" />
          </TouchableOpacity>

        </View>
      </View>

      {/* Home indicator at the very bottom of the screen */}
      <HomeIndicator />

    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const MAP_HEIGHT = height * 0.52; // map image takes 52% of screen height

const styles = StyleSheet.create({

  // ── Root ──
  // flex: 1 fills the entire screen
  root: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  // ── Map Image ──
  // Full screen width, fixed height — resizeMode="cover" handles cropping
  mapImage: {
    width,
    height: MAP_HEIGHT,
  },

  // ── Floating Buttons ──
  // position: "absolute" layers these over the map image
  topControls: {
    position: "absolute",
    top: 52,        // distance from the top of the screen (clears status bar)
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // Each button — #EDEDED background, 44×44, rounded 12px corners
  floatBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EDEDED",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Bottom Sheet ──
  sheet: {
    flex: 1,                      // fills all remaining space below the map
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,      // rounded corners overlapping the map
    borderTopRightRadius: 24,
    marginTop: -24,               // pulls card up over the map edge
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 12,
  },

  // ── Drag Indicator ──
  // Centers the pill horizontally inside the sheet
  dragIndicatorWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  // The pill itself — matches the Figma spec exactly
  dragIndicator: {
    width: 45,
    height: 5,
    borderRadius: 16,
    backgroundColor: "#E3E3E3",
  },

  // ── Delivery Time ──
  timeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#242424",
    textAlign: "center",
    marginBottom: 6,
  },

  // ── Delivery Address ──
  destinationText: {
    fontSize: 14,
    color: "#242424",
    textAlign: "center",
    marginBottom: 20,
  },
  // Inner bold span — only overrides fontWeight, inherits everything else
  destinationBold: {
    fontWeight: "700",
  },

  // ── Progress Indicators ──
  progressRow: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginBottom: 20,
  },
  // Base shape shared by all 4 bars
  progressBar: {
    width: 71.25,
    height: 4,
    borderRadius: 20,
  },
  progressActive:   { backgroundColor: "#36C07E" }, // green — step done
  progressInactive: { backgroundColor: "#E3E3E3" }, // grey  — step pending

  // ── Status Card ──
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    padding: 14,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  // Warm beige square behind the moped icon
  bikeIconBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: "#FFF6F0",
    alignItems: "center",
    justifyContent: "center",
  },
  // flex: 1 — text column fills remaining width without squishing the icon
  statusTextWrapper: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#242424",
    marginBottom: 4,
  },
  statusDesc: {
    fontSize: 12,
    color: "#A2A2A2",
    lineHeight: 18,
  },

  // ── Courier Section ──
  courierRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  // Slightly rounded square — not a full circle
  courierAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
  },
  // flex: 1 — pushes the call button all the way to the right
  courierInfo: {
    flex: 1,
  },
  courierName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#242424",
    marginBottom: 2,
  },
  courierRole: {
    fontSize: 13,
    color: "#A2A2A2",
  },
  // Outlined square call button
  callBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
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

});