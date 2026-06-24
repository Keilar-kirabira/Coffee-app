

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

      {/* ── FLOATING BUTTONS — sit above the map via position absolute ── */}
      <View style={styles.topControls}>
        <TouchableOpacity
          style={styles.floatBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={20} color="#1A1A1A" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.floatBtn}>
          {/*
            The Figma location button uses a crosshair/target icon.
            "locate-outline" in Ionicons is the closest match —
            it renders as a circle with crosshair lines, identical
            to the Figma design. If you want pixel-perfect match,
            export the icon from Figma as an SVG and wrap it in
            an <Image> component instead.
          */}
          <Ionicons name="locate-outline" size={20} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {/* ── BOTTOM SHEET ── */}
      <View style={styles.sheet}>

        {/* Drag indicator — centred grey pill at the very top */}
        <View style={styles.dragIndicatorWrapper}>
          <View style={styles.dragIndicator} />
        </View>

        {/* ── DELIVERY TIME ──
            Figma: Sora SemiBold 16px, color #242424, line-height 150%  */}
        <Text style={styles.timeText}>10 minutes left</Text>

        {/* ── DELIVERY ADDRESS ──
            Figma: Sora Regular 12px, line-height 150%
            "Jl. Kpg Sutoyo" is bold via nested <Text>                  */}
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

        {/* ── DELIVERY STATUS CARD ──
            Figma: 327×77, border-radius 12, border 1px #E3E3E3
            padding: 8 16 8 12, gap 16                                   */}
        <View style={styles.statusCard}>
          <View style={styles.bikeIconBox}>
            <MaterialCommunityIcons name="moped" size={28} color="#C67C4E" />
          </View>

          <View style={styles.statusTextWrapper}>
            {/* Figma: Sora SemiBold 14px, color #242424 */}
            <Text style={styles.statusTitle}>Delivered your order</Text>
            {/* Figma: Sora Light 12px, color #A2A2A2, line-height 150% */}
            <Text style={styles.statusDesc}>
              We will deliver your goods to you in the shortest possible time.
            </Text>
          </View>
        </View>

        {/* ── COURIER ROW ──
            Figma: 327×56, gap 76 between avatar and name block
            No card/border — just a flat row                             */}
        <View style={styles.courierRow}>
          <Image source={Profile} style={styles.courierAvatar} />

          <View style={styles.courierInfo}>
            <Text style={styles.courierName}>Brooklyn Simmons</Text>
            <Text style={styles.courierRole}>Personal Courier</Text>
          </View>

          {/*
            CALL BUTTON ICON:
            The Figma icon is a phone handset with a circular arrow/signal
            arc around it — this is "call-outline" in Ionicons which renders
            as exactly that shape. If it still doesn't match, the alternative
            is to export the icon SVG from Figma and use it as a local image:

              import CallIcon from "../assets/images/call-icon.png";
              <Image source={CallIcon} style={{ width: 22, height: 22 }} />

            That gives you a pixel-perfect match.
          */}
          <TouchableOpacity style={styles.callBtn}>
            {/* <Ionicons name="call-outline" size={20} color="#1A1A1A" /> */}
            <Image source={CallIcon} style={{ width: 22, height: 22 }} />
          </TouchableOpacity>
        </View>

      </View>

      <HomeIndicator />
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const MAP_HEIGHT = height * 0.45;

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
  },
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
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 24,   // matches Figma left: 24px on cards
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
  // Figma: Sora SemiBold 16px, color #242424, line-height 150%
  timeText: {
    fontFamily: "Sora_600SemiBold",
    fontSize: 16,
    lineHeight: 24,           // 16 * 1.5 = 24
    color: "#242424",
    textAlign: "center",
    marginBottom: 4,
  },

  // ── Delivery Address ──
  // Figma: Sora Regular 12px, line-height 150%
  destinationText: {
    fontFamily: "Sora_400Regular",
    fontSize: 12,
    lineHeight: 18,           // 12 * 1.5 = 18
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
    marginBottom: 8,         // reduced — closes the gap to the status card
  },
  progressBar: {
    width: 71.25,
    height: 4,
    borderRadius: 20,
  },
  progressActive:   { backgroundColor: "#36C07E" },
  progressInactive: { backgroundColor: "#E3E3E3" },

  // ── Status Card ──
  // Figma: 327×77, border-radius 12, border 1px #E3E3E3
  // padding: top 8, right 16, bottom 8, left 12 — gap 16
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,                  // Figma gap: 16
    borderRadius: 12,         // Figma border-radius: 12
    borderWidth: 1,
    borderColor: "#E3E3E3",   // Figma border: 1px solid #E3E3E3
    paddingTop: 8,            // Figma padding-top: 8
    paddingRight: 16,         // Figma padding-right: 16
    paddingBottom: 8,         // Figma padding-bottom: 8
    paddingLeft: 12,          // Figma padding-left: 12
    marginBottom: 20,         // tight gap to courier row below
    backgroundColor: "#FFFFFF",
  },
  bikeIconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#FFF6F0",
    alignItems: "center",
    justifyContent: "center",
  },
  statusTextWrapper: {
    flex: 1,
  },
  // Figma: Sora SemiBold 14px, color #242424
  statusTitle: {
    fontFamily: "Sora_600SemiBold",
    fontSize: 14,
    lineHeight: 21,           // 14 * 1.5
    color: "#242424",
    marginBottom: 2,
  },
  // Figma: Sora Light 12px, color #A2A2A2, line-height 150%
  statusDesc: {
    fontFamily: "Sora_300Light",
    fontSize: 12,
    lineHeight: 18,           // 12 * 1.5
    color: "#A2A2A2",
  },

  // ── Courier Row ──
  // Figma: 327×56, no border/card, gap 76 between left block and call btn
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
  // flex: 1 fills the space — combined with the fixed callBtn width this
  // naturally produces the ~76px visual gap the Figma specifies
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
  // Outlined square button — white bg, light border
  callBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
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