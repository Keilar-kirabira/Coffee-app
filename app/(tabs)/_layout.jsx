import { Tabs } from "expo-router";
import { View, StyleSheet, Image } from "react-native";

// ── Custom Figma tab icons ─────────────────────────────────────
import HomeIcon         from "../../assets/images/Home.png";
import FavoritesIcon    from "../../assets/images/favorites.png";
import BagIcon          from "../../assets/images/bag.png";
import NotificationIcon from "../../assets/images/Notification.png";

// ── Small dot under the active icon ───────────────────────────
function ActiveDot() {
  return <View style={styles.dot} />;
}

// ── Tab icon with optional dot below ──────────────────────────
function TabIcon({ source, focused, suppressDot }) {
  return (
    <View style={styles.iconWrapper}>
      <Image
        source={source}
        style={styles.tabIcon}
        resizeMode="contain"
      />
      {focused && !suppressDot && <ActiveDot />}
    </View>
  );
}

// ── Home indicator rendered inside the tab bar ────────────────
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
        tabBarBackground: () => <TabBarBackground />,
        tabBarStyle: {
          height: 96,
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
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={HomeIcon} focused={focused} suppressDot={true} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={FavoritesIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={BagIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={NotificationIcon} focused={focused} />
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

  // ── PNG icon size ───────────────────────────────────────────
  tabIcon: {
    width: 32,
    height: 32,
  },

  // ── Active dot under icon ───────────────────────────────────
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#C67C4E",
  },

  // ── Tab bar background container ────────────────────────────
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