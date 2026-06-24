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

import CaffeMocha from "../assets/images/2.png";
import FlatWhite from "../assets/images/3.png";
import Cappuccino from "../assets/images/5.png";
import Americano from "../assets/images/4.png";

const { width } = Dimensions.get("window");

const COFFEES = [
  { id: "1", name: "Caffe Mocha",  subtitle: "Deep Foam",     price: 4.53, image: CaffeMocha  },
  { id: "2", name: "Flat White",   subtitle: "Espresso",      price: 3.53, image: FlatWhite   },
  { id: "3", name: "Cappuccino",   subtitle: "with Oat Milk", price: 4.20, image: Cappuccino  },
  { id: "4", name: "Americano",    subtitle: "Black Bold",    price: 3.20, image: Americano   },
];

// ── Home indicator (matches your other screens) ──────────────
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

  const [tab, setTab]         = useState("Deliver");   // "Deliver" | "Pick Up"
  const [quantity, setQuantity] = useState(1);
  const [payment, setPayment]   = useState("Cash");    // "Cash" | "Wallet"

  const itemTotal   = coffee.price * quantity;
  const discount    = 1.0;
  const deliveryFee = 1.0;
  const total       = itemTotal - discount + deliveryFee;

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={["top"]}>

        {/* ── Top Bar ── */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#2A2A2A" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Order</Text>
          {/* spacer */}
          <View style={styles.backBtn}/> 
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
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardLabel}>Delivery Address</Text>
              <TouchableOpacity style={styles.editBtn}>
                <Ionicons name="pencil-outline" size={14} color="#C67C4E" />
                <Text style={styles.editText}>Edit Address</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.addressName}>Jl. Kpg Sutoyo</Text>
            <Text style={styles.addressSub}>
              Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.
            </Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Note row */}
            <TouchableOpacity style={styles.noteRow}>
              <View style={styles.noteLeft}>
                <Ionicons name="document-text-outline" size={18} color="#C67C4E" />
                <Text style={styles.noteText}>Add Note</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#A2A2A2" />
            </TouchableOpacity>
          </View>

          {/* ── Coffee Item Card ── */}
          <View style={styles.card}>
            <View style={styles.itemRow}>
              <Image source={coffee.image} style={styles.itemImage} resizeMode="cover" />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{coffee.name}</Text>
                <Text style={styles.itemSub}>{coffee.subtitle}</Text>
                {size ? <Text style={styles.itemSize}>Size: {size}</Text> : null}
              </View>
              {/* Quantity Selector */}
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

          {/* ── Discount Card ── */}
          <TouchableOpacity style={[styles.card, styles.discountRow]}>
            <View style={styles.discountLeft}>
              <Ionicons name="pricetag-outline" size={20} color="#C67C4E" />
              <Text style={styles.discountText}>1 Discount is applied</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A2A2A2" />
          </TouchableOpacity>

          {/* ── Payment Summary ── */}
          <View style={styles.card}>
            <Text style={styles.summaryTitle}>Payment Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Price</Text>
              <Text style={styles.summaryValue}>$ {itemTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>- $ {discount.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>$ {deliveryFee.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Payment</Text>
              <Text style={styles.totalValue}>$ {total.toFixed(2)}</Text>
            </View>
          </View>

          {/* ── Payment Method ── */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Payment Method</Text>
            <View style={styles.paymentRow}>
              {["Cash", "Wallet"].map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.paymentOption,
                    payment === method && styles.paymentOptionActive,
                  ]}
                  onPress={() => setPayment(method)}
                >
                  <Ionicons
                    name={method === "Cash" ? "cash-outline" : "wallet-outline"}
                    size={20}
                    color={payment === method ? "#C67C4E" : "#A2A2A2"}
                  />
                  <Text
                    style={[
                      styles.paymentText,
                      payment === method && styles.paymentTextActive,
                    ]}
                  >
                    {method}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* bottom padding for the fixed Order button */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>

      {/* ── Fixed Order Button ── */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.orderBtn}
        onPress={() => router.push("/delivery")}>
          <Text style={styles.orderBtnText}>Order</Text>
        </TouchableOpacity>
      </View>

      {/* ── Home Indicator ── */}
      <HomeIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F9F9F9" },
  safe: { flex: 1 },

  // ── Top Bar ──
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
    fontWeight: "700",
    color: "#1A1A1A",
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },

  // ── Toggle ──
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#EDEDED",
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  toggleBtnActive: { backgroundColor: "#C67C4E" },
  toggleText:       { fontSize: 14, fontWeight: "600", color: "#A2A2A2" },
  toggleTextActive: { color: "#FFFFFF" },

  // ── Card ──
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardLabel: { fontSize: 14, fontWeight: "700", color: "#1A1A1A" },

  editBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  editText: { fontSize: 12, fontWeight: "600", color: "#C67C4E" },

  addressName: { fontSize: 15, fontWeight: "700", color: "#1A1A1A", marginBottom: 2 },
  addressSub:  { fontSize: 13, color: "#A2A2A2", lineHeight: 20 },

  divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 12 },

  noteRow:  { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  noteLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  noteText: { fontSize: 14, fontWeight: "600", color: "#1A1A1A" },

  // ── Item ──
  itemRow:   { flexDirection: "row", alignItems: "center", gap: 12 },
  itemImage: { width: 60, height: 60, borderRadius: 12 },
  itemInfo:  { flex: 1 },
  itemName:  { fontSize: 14, fontWeight: "700", color: "#1A1A1A" },
  itemSub:   { fontSize: 12, color: "#A2A2A2", marginTop: 2 },
  itemSize:  { fontSize: 12, color: "#C67C4E", marginTop: 2, fontWeight: "600" },

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
  qtyText: { fontSize: 15, fontWeight: "700", color: "#1A1A1A", minWidth: 16, textAlign: "center" },

  // ── Discount ──
  discountRow:  { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  discountLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  discountText: { fontSize: 14, fontWeight: "600", color: "#1A1A1A" },

  // ── Summary ──
  summaryTitle: { fontSize: 15, fontWeight: "700", color: "#1A1A1A", marginBottom: 12 },
  summaryRow:   { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: "#A2A2A2" },
  summaryValue: { fontSize: 14, fontWeight: "600", color: "#1A1A1A" },
  discountValue:{ color: "#C67C4E" },
  totalLabel:   { fontSize: 15, fontWeight: "700", color: "#1A1A1A" },
  totalValue:   { fontSize: 15, fontWeight: "700", color: "#C67C4E" },

  // ── Payment ──
  paymentRow: { flexDirection: "row", gap: 12, marginTop: 12 },
  paymentOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
  },
  paymentOptionActive: { borderColor: "#C67C4E", backgroundColor: "#FFF6F0" },
  paymentText:         { fontSize: 14, fontWeight: "600", color: "#A2A2A2" },
  paymentTextActive:   { color: "#C67C4E" },

  // ── Bottom Order Button ──
  bottomBar: {
    position: "absolute",
    bottom: 28,
    left: 16,
    right: 16,
  },
  orderBtn: {
    backgroundColor: "#C67C4E",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },
  orderBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },

  // ── Home Indicator ──
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