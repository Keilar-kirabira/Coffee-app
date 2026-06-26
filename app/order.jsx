import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";

// ── Coffee images ──────────────────────────────────────────────
import CaffeMocha   from "../assets/images/2.png";
import FlatWhite    from "../assets/images/3.png";
import Cappuccino   from "../assets/images/5.png";
import Americano    from "../assets/images/4.png";

// ── Custom icons (PNG assets) ──────────────────────────────────
import EditIcon     from "../assets/images/Edit.png";
import DocumentIcon from "../assets/images/Document.png";
import PaymentIcon  from "../assets/images/payment.png";
import WalletIcon   from "../assets/images/Wallet.png";

const { width } = Dimensions.get("window");

const COFFEES = [
  { id: "1", name: "Caffe Mocha",  subtitle: "Deep Foam",     price: 4.53, image: CaffeMocha  },
  { id: "2", name: "Flat White",   subtitle: "Espresso",      price: 3.53, image: FlatWhite   },
  { id: "3", name: "Cappuccino",   subtitle: "with Oat Milk", price: 4.20, image: Cappuccino  },
  { id: "4", name: "Americano",    subtitle: "Black Bold",    price: 3.20, image: Americano   },
];

// ── Home indicator ─────────────────────────────────────────────
function HomeIndicator() {
  return (
    <View style={styles.homeIndicatorWrapper}>
      <View style={styles.homeIndicator} />
    </View>
  );
}

export default function OrderScreen() {
  const router = useRouter();
  const { id, size } = useLocalSearchParams();

  const coffee = COFFEES.find((c) => c.id === id) ?? COFFEES[0];

  const [tab,      setTab]      = useState("Deliver");
  const [quantity, setQuantity] = useState(1);
  const [payment,  setPayment]  = useState("Cash");

  const itemTotal   = coffee.price * quantity;
  const discount    = 1.0;
  const deliveryFee = 1.0;
  const total = itemTotal + deliveryFee; 

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={["top"]}>

        {/* ── Top Bar ── */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#2A2A2A" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Order</Text>
          <View style={styles.backBtn} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* ── Deliver / Pick Up Toggle ── */}
          <View style={styles.toggleContainer}>
            {["Deliver", "Pick Up"].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.toggleBtn, tab === t && styles.toggleBtnActive]}
                onPress={() => setTab(t)}
              >
                <Text style={[styles.toggleText, tab === t && styles.toggleTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Delivery Address ── */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Delivery Address</Text>
            <Text style={styles.addressName}>Jl. Kpg Sutoyo</Text>
            <Text style={styles.addressSub}>
              Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.
            </Text>

            <View style={styles.addressBtnRow}>
              <TouchableOpacity style={styles.addressActionBtn}>
                <Image
                  source={EditIcon}
                  style={{ width: 14, height: 14, tintColor: "#1A1A1A" }}
                />
                <Text style={styles.addressActionText}>Edit Address</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.addressActionBtn}>
                <Image
                  source={DocumentIcon}
                  style={{ width: 14, height: 14, tintColor: "#1A1A1A" }}
                />
                <Text style={styles.addressActionText}>Add Note</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={styles.divider} /> */}

          {/* ── Coffee Item ── */}
          <View style={styles.section}>
            <View style={styles.itemRow}>
              <Image
                source={coffee.image}
                style={styles.itemImage}
                resizeMode="cover"
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{coffee.name}</Text>
                <Text style={styles.itemSub}>{coffee.subtitle}</Text>
              </View>

              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Ionicons name="remove" size={16} color="#C67C4E" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity((q) => q + 1)}
                >
                  <Ionicons name="add" size={16} color="#C67C4E" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ── Discount Row ── */}
          <TouchableOpacity style={styles.discountCard}>
            <View style={styles.discountLeft}>
              <Image
                source={PaymentIcon}
                style={{ width: 20, height: 20, tintColor: "#C67C4E" }}
              />
              <Text style={styles.discountText}>1 Discount is Applies</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A2A2A2" />
          </TouchableOpacity>

          {/* ── Payment Summary ── */}
          <View style={styles.section}>
            <Text style={styles.summaryHeading}>Payment Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Price</Text>
              <Text style={styles.summaryValue}>$ {itemTotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <View style={styles.feeValueGroup}>
                <Text style={styles.feeStrike}>
                  $ {(deliveryFee + discount).toFixed(1)}
                </Text>
                <Text style={styles.summaryValue}>$ {deliveryFee.toFixed(1)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* ── Payment Method ── */}
          <TouchableOpacity style={styles.paymentMethodRow}>
            <View style={styles.walletIconWrap}>
              <Image
                source={WalletIcon}
                style={{ width: 22, height: 22, tintColor: "#C67C4E" }}
              />
            </View>
            <View style={styles.paymentMethodInfo}>
              <Text style={styles.paymentMethodLabel}>Cash/Wallet</Text>
              <Text style={styles.paymentMethodAmount}>$ {total.toFixed(2)}</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color="#1A1A1A" />
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>

      {/* ── Fixed Order Button ── */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.orderBtn}
          onPress={() => router.push("/delivery")}
        >
          <Text style={styles.orderBtnText}>Order</Text>
        </TouchableOpacity>
      </View>

      <HomeIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },
  safe: { flex: 1 },

  // ── Top Bar ──────────────────────────────────────────────────
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  screenTitle: {
    fontSize: 18,
    fontFamily: "Sora_700Bold",
    color: "#1A1A1A",
  },

  // ── Scroll ───────────────────────────────────────────────────
  scrollContent: { paddingTop: 4 },

  // ── Toggle ───────────────────────────────────────────────────
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#EDEDED",
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  toggleBtn:        { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  toggleBtnActive:  { backgroundColor: "#C67C4E" },
  toggleText:       { fontSize: 14, fontFamily: "Sora_600SemiBold", color: "#A2A2A2" },
  toggleTextActive: { color: "#FFFFFF" },

  // ── Section ──────────────────────────────────────────────────
  section: { paddingHorizontal: 16, paddingVertical: 16 },
  sectionHeading: {
    fontSize: 16,
    fontFamily: "Sora_900Bold",
    color: "#242424",
    marginBottom: 8,
    
  },

  // ── Address ──────────────────────────────────────────────────
  addressName: {
    fontSize: 15,
    fontFamily: "Sora_700Bold",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  addressSub: {
    fontSize: 13,
    fontFamily: "Sora_400Regular",
    color: "#A2A2A2",
    lineHeight: 20,
    marginBottom: 14,
  },
  addressBtnRow: { flexDirection: "row", gap: 10 },
  addressActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  addressActionText: {
    fontSize: 12,
    fontFamily: "Sora_600SemiBold",
    color: "#1A1A1A",
  },

  // ── Divider ──────────────────────────────────────────────────
  divider: { height: 1, backgroundColor: "#F0F0F0", marginHorizontal: 16 },

  // ── Coffee Item ──────────────────────────────────────────────
  itemRow:   { flexDirection: "row", alignItems: "center", gap: 12 },
  itemImage: { width: 60, height: 60, borderRadius: 12 },
  itemInfo:  { flex: 1 },
  itemName:  { fontSize: 14, fontFamily: "Sora_700Bold",    color: "#1A1A1A" },
  itemSub:   { fontSize: 12, fontFamily: "Sora_400Regular", color: "#A2A2A2", marginTop: 2 },

  // ── Quantity stepper ─────────────────────────────────────────
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    fontSize: 15,
    fontFamily: "Sora_700Bold",
    color: "#1A1A1A",
    minWidth: 16,
    textAlign: "center",
  },

  // ── Discount card ─────────────────────────────────────────────
  discountCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EDEDED",
    backgroundColor: "#FFFFFF",
     shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  discountLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  discountText: {
    fontSize: 14,
    fontFamily: "Sora_600SemiBold",
    color: "#1A1A1A",
  },

  // ── Payment Summary ───────────────────────────────────────────
  summaryHeading: {
    fontSize: 16,
    fontFamily: "Sora_700Bold",
    color: "#1A1A1A",
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: "Sora_600SemiBold",
    color: "#313131",
    lineHeight: 21,
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: "Sora_600SemiBold",
    color: "#313131",
    lineHeight: 21,
  },
  feeValueGroup: { flexDirection: "row", alignItems: "center", gap: 6 },
  feeStrike: {
    fontSize: 14,
    fontFamily: "Sora_400Regular",
    color: "#A2A2A2",
    textDecorationLine: "line-through",
  },

  // ── Payment Method row ────────────────────────────────────────
  paymentMethodRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
 
  },
  walletIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FFF6F0",
    alignItems: "center",
    justifyContent: "center",
  },
  paymentMethodInfo:   { flex: 1 },
  paymentMethodLabel:  { fontSize: 14, fontFamily: "Sora_700Bold",    color: "#1A1A1A" },
  paymentMethodAmount: { fontSize: 13, fontFamily: "Sora_600SemiBold", color: "#C67C4E", marginTop: 2 },

  // ── Order Button ──────────────────────────────────────────────
  bottomBar: { position: "absolute", bottom: 28, left: 16, right: 16 },
  orderBtn: {
    backgroundColor: "#C67C4E",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },
  orderBtnText: { color: "#FFFFFF", fontSize: 16, fontFamily: "Sora_700Bold" },

  // ── Home Indicator ────────────────────────────────────────────
  homeIndicatorWrapper: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#242424",
  },
});