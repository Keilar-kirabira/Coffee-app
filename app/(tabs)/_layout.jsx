
// This file controls the bottom tab navigation for the entire app.
// Every screen inside the (tabs) folder is registered here.

import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ACTIVE   = "#C67C4E"; 
const INACTIVE = "#A2A2A2"; 

//Small dot shown under the active tab icon 
function ActiveDot() {
  return <View style={styles.dot} />;
}

// ── Reusable tab icon component ───────────────────────────────
// `name`   → Ionicons icon name
// `color`  → passed automatically by Tabs (active or inactive)
// `focused`→ true when this tab is selected
function TabIcon({ name, color, focused }) {
  return (
    <View style={styles.iconWrapper}>
      <Ionicons name={name} size={24} color={color} />
      {/* Only render the dot underneath the icon that is active */}
      {focused && <ActiveDot />}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // hide the top header bar on every tab screen

        // ── Bottom bar styling ──────────────────────────────
        tabBarStyle: {
          height: 99,
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderTopWidth: 0,       // remove the default grey border line
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: 16,
          position: "absolute",    // float over the screen content
          // Shadow so the bar lifts off the content below
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 12,
        },

        tabBarActiveTintColor:   ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarShowLabel: false,  // hide text labels — icons only
      }}
    >
      {/*  Home tab  */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} />
          ),
        }}
      />

      {/*  Favorites tab  */}
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="heart-outline" color={color} focused={focused} />
          ),
        }}
      />

      {/*  Cart tab  */}
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="bag-outline" color={color} focused={focused} />
          ),
        }}
      />

      {/*  Notifications tab  */}
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
  // Wrapper so we can stack the icon and dot vertically
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  // Small filled circle under the active icon
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C67C4E",
  },
});