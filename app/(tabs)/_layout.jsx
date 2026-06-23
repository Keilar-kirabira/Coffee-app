import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ACTIVE   = "#C67C4E";
const INACTIVE = "#A2A2A2";

// ── Small dot under the active icon ───────────────────────────
function ActiveDot() {
  return <View style={styles.dot} />;
}

// ── Tab icon with optional dot below ──────────────────────────
function TabIcon({ name, color, focused }) {
  return (
    <View style={styles.iconWrapper}>
      <Ionicons name={name} size={24} color={color} />
      {focused && <ActiveDot />}
    </View>
  );
}

// ── Home indicator rendered inside the tab bar ────────────────
// This is the dark pill at the top of the tab bar,
// matching the iOS-style home indicator from the Figma design
function TabBarBackground() {
  return (
    <View style={styles.tabBarBg}>
      <View style={styles.homeIndicatorWrapper}>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Renders TabBarBackground inside the tab bar container
        tabBarBackground: () => <TabBarBackground />,

        tabBarStyle: {
          height: 99,
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderTopWidth: 0,
          paddingHorizontal: 24,
          paddingTop: 12,  
          paddingBottom: 16,
          position: "absolute",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 12,
        },

        tabBarActiveTintColor:   ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="heart-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="bag-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="notifications-outline" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // ── Tab icon wrapper ────────────────────────────────────────
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  // ── Active dot under icon ───────────────────────────────────
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C67C4E",
  },

  // ── Tab bar background container ────────────────────────────
  // Must be absolute and fill the entire tab bar area
  tabBarBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  // ── Indicator wrapper — centers the pill horizontally ───────
  homeIndicatorWrapper: {
    alignItems: "center",
    marginTop: "auto", 
    paddingBottom: 8, 
  },

  // ── The dark pill itself ────────────────────────────────────
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#242424",
  },
});