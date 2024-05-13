import { useState } from "react";
import { Image, StyleSheet, Platform } from "react-native";

import { Carrot } from "@/components/Carrot";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedButton from "@/components/ThemedButton";
import { Picker } from "@react-native-picker/picker";
import { Crop, crops } from "@/data/Crops";
export default function HomeScreen() {
  const [selectedCropKey, setselectedCropKey] = useState("carrot");
  console.log("selectedCropKey", selectedCropKey);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/background.jpg")}
          style={styles.reactLogo}
        />
      }
    >
      <Picker
        selectedValue={selectedCropKey}
        onValueChange={(cropKey, itemIndex) => {
          console.log("setchange", cropKey);
          setselectedCropKey(cropKey);
        }}
      >
        {Object.keys(crops).map((cropKey, i) => {
          return <Picker.Item label={cropKey} value={cropKey} key={i} />;
        })}
      </Picker>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Stardew Valley Copilot!</ThemedText>
        <Carrot />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{crops[selectedCropKey].name}</ThemedText>
        <ThemedText>
          Total Profit: {crops[selectedCropKey].produce.price}{" "}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Crop Info </ThemedText>
        <ThemedText>
          Value (Normal): {crops[selectedCropKey].produce.price}{" "}
        </ThemedText>
        <ThemedText>
          Seeds (Pierre): {crops[selectedCropKey].seeds.pierre}
        </ThemedText>
        <ThemedText>
          Seeds (Joja): {crops[selectedCropKey].seeds.joja}
        </ThemedText>
      </ThemedView>
      <ThemedButton text="Calcular" />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 100,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
