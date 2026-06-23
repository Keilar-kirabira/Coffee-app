import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";


const { width, height } = Dimensions.get("window");


const HERO_HEIGHT = height * 0.58;

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>

   
      <Image
        source={require("../assets/images/coffee-cup.png")}
        style={styles.heroImage}
        resizeMode="cover"
      />

     
      <LinearGradient
        colors={["transparent", "#050505"]}
        style={styles.overlay}
      />

     
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>

       
        <View style={styles.spacer} />

        <Text style={styles.heading}>
          Fall in Love with Coffee in Blissful Delight!
        </Text>

        <Text style={styles.subheading}>
          Welcome to our cozy coffee corner, where every cup is a delight for you.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => router.replace("/(tabs)/home")} // Navigate to next screen
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.homeIndicatorWrapper}>
          <View style={styles.homeIndicator} />
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({

 
  root: {
    flex: 1,
    backgroundColor: "#050505",
  },

  // Image is pinned to top-left, fills full width, 58% of screen height
  heroImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: HERO_HEIGHT,
  },

  // Overlay sits at the bottom half of the hero image and fades to black
  overlay: {
    position: "absolute",
    top: HERO_HEIGHT * 0.5,   // starts halfway through the image
    left: 0,
    right: 0,
    height: HERO_HEIGHT * 0.6, // tall enough to fully cover the fade zone
  },

  // SafeAreaView fills all remaining space, with side padding
  safe: {
    flex: 1,
    paddingHorizontal: 24,
  },

  // Pushes all content below the hero image
  spacer: {
    height: HERO_HEIGHT - 40, // -40 so text slightly overlaps the image bottom
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 42,
    marginBottom: 14,
  },

  subheading: {
    color: "#A2A2A2",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 36,
  },

  button: {
    backgroundColor: "#C67C4E",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },

  homeIndicatorWrapper: {
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 16,
  },

  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#242424",
  },

});