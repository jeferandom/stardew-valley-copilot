import { useState, useEffect } from "react";
import { Image, StyleSheet, Platform } from "react-native";

import { Carrot } from "@/components/Carrot";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedButton from "@/components/ThemedButton";
import { Picker } from "@react-native-picker/picker";
import { Crop, crops } from "@/data/Crops";
import options from "@/data/Options";
import { fertilizers, Fertilizer, Fertilizers } from "@/data/Fertilizers";

/*
 * Calculates the ratios of different crop ratings based on fertilizer level and player farming level
 * Math is from Crop.harvest(...) game logic
 *
 * @param fertilizer The level of the fertilizer (none:0, basic:1, quality:2, deluxe:3)
 * @param level The total farming skill level of the player
 * @return Object containing ratios of iridium, gold, silver, and unrated crops liklihood
 */
const levelRatio = (fertilizer: number, level: number, isWildseed: boolean) => {
  var ratio = {};

  if (isWildseed) {
    // All wild crops are iridium if botanist is selected
    if (options.skills.botanist) ratio.ratioI = 1;
    else ratio.ratioI = 0;
    // Gold foraging is at a rate of foraging level/30 (and not iridium)
    ratio.ratioG = (level / 30.0) * (1 - ratio.ratioI);
    // Silver is at a rate of foraging level/15 (and not gold or iridium)
    ratio.ratioS = (level / 15.0) * (1 - ratio.ratioG - ratio.ratioI);
    // Normal is the remaining rate
    ratio.ratioN = 1 - ratio.ratioS - ratio.ratioG - ratio.ratioI;
  } else {
    // Iridium is available on deluxe fertilizer at 1/2 gold ratio
    ratio.ratioI =
      fertilizer >= 3
        ? (0.2 * (level / 10.0) +
          0.2 * fertilizer * ((level + 2) / 12.0) +
          0.01) /
        2
        : 0;
    // Calculate gold times probability of not iridium
    ratio.ratioG =
      (0.2 * (level / 10.0) + 0.2 * fertilizer * ((level + 2) / 12.0) + 0.01) *
      (1.0 - ratio.ratioI);
    // Probability of silver capped at .75, times probability of not gold/iridium
    ratio.ratioS = Math.max(
      0,
      Math.min(0.75, ratio.ratioG * 2.0) * (1.0 - ratio.ratioG - ratio.ratioI)
    );
    // Probability of not the other ratings
    ratio.ratioN = Math.max(
      0,
      1.0 - ratio.ratioS - ratio.ratioG - ratio.ratioI
    );
  }
  return ratio;
};



/*
 * Calculates the number of crops planted.
 * @param crop The crop object, containing all the crop data.
 * @return The number of crops planted, taking the desired number planted and the max seed money into account.
 */
const planted = (crop) => {
  if (options.buySeed && options.maxSeedMoney !== 0) {
    return Math.min(
      options.planted,
      Math.floor(options.maxSeedMoney / minSeedCost(crop))
    );
  } else {
    return options.planted;
  }
};
export default function HomeScreen() {
  const [selectedCrop, setSelectedCrop] = useState("carrot");
  const [selectedSeason, setSelectedSeason] = useState("spring");
  const [currentDay, setCurrentDay] = useState(1);
  const [numberDays, setNumberDays] = useState(28);
  const [numberOfCrops, setNumberOfCrops] = useState(1);
  const [isCrossSeason, setIsCrossSeason] = useState(false);
  const [profit, setProfit] = useState(0);
  const [profitData, setProfitData] = useState({});

  /*
 * Calculates the profit for a specified crop.
 * @param crop The crop object, containing all the crop data.
 * @return The total profit.
 */
  const calculateProfit = (crop: Crop) => {
    console.log(crop)
    var num_planted = planted(crop);
    //var total_harvests = crop.harvests * num_planted;
    var fertilizer = fertilizers[options.fertilizer];
    var produce = options.produce;
    var isTea = crop.name === "Tea Leaves";
    var isCoffee = crop.name == "Coffee Bean";

    var useLevel = options.level;
    if (crop.isWildseed) useLevel = options.foragingLevel;

    const { ratioN, ratioS, ratioG, ratioI } = levelRatio(
      fertilizer.ratio,
      useLevel + options.foodLevel,
      crop.isWildseed
    );

    if (isTea) (ratioN = 1), (ratioS = ratioG = ratioI = 0);
    var netIncome = 0;
    var netExpenses = 0;
    var totalProfit = 0;
    var totalReturnOnInvestment = 0;
    var averageReturnOnInvestment = 0;

    //Skip keg/jar calculations for ineligible crops (where corp.produce.jar or crop.produce.keg = 0)

    var userawproduce = false;

    switch (produce) {
      case 1:
        if (crop.produce.jarType == null) userawproduce = true;
        break;
      case 2:
        if (crop.produce.kegType == null) userawproduce = true;
        break;
    }

    var total_harvest =
      num_planted * 1.0 +
      num_planted * crop.produce.extraPerc * crop.produce.extra;
    var forSeeds = 0;
    if (options.replant && !isTea) {
      if (isCoffee && options.nextyear) {
        forSeeds = num_planted;
      } else if (crop.growth.regrow > 0 && options.nextyear) {
        forSeeds = num_planted * 0.5;
      } else if (crop.growth.regrow == 0) {
        forSeeds = num_planted * crop.harvests * 0.5;
        if (!options.nextyear && forSeeds >= 1) forSeeds--;
      }
    }

    var total_crops = total_harvest * crop.harvests;

    // console.log("Calculating raw produce value for: " + crop.name);
    // Determine income
    if (produce == 0 || userawproduce) {
      if (userawproduce && !options.sellRaw) {
        netIncome = 0;
      } else {
        var countN = total_crops * ratioN;
        var countS = total_crops * ratioS;
        var countG = total_crops * ratioG;
        var countI = total_crops * ratioI;
        if (options.replant) {
          if (countN - forSeeds < 0) {
            forSeeds -= countN;
            countN = 0;
          } else {
            countN -= forSeeds;
            forSeeds = 0;
          }
          if (countS - forSeeds < 0) {
            forSeeds -= countS;
            countS = 0;
          } else {
            countS -= forSeeds;
            forSeeds = 0;
          }
          if (countG - forSeeds < 0) {
            forSeeds -= countG;
            countG = 0;
          } else {
            countG -= forSeeds;
            forSeeds = 0;
          }
          if (countI - forSeeds < 0) {
            forSeeds -= countI;
            countI = 0;
          } else {
            countI -= forSeeds;
            forSeeds = 0;
          }
        }
        netIncome += crop.produce.price * countN;
        netIncome += Math.trunc(crop.produce.price * 1.25) * countS;
        netIncome += Math.trunc(crop.produce.price * 1.5) * countG;
        netIncome += crop.produce.price * 2 * countI;

        if (options.skills.till) {
          netIncome *= 1.1;
          // console.log("Profit (After skills): " + profit);
        }
      }
    } else if (produce == 3) {
      netIncome += 2 * (total_crops - forSeeds) * crop.seeds.sell;
    } else {
      var kegModifier = getKegModifier(crop);
      var caskModifier = getCaskModifier();

      var items = total_harvest;
      if (
        options.equipment > 0 &&
        (options.produce == 1 || options.produce == 2)
      ) {
        items = Math.min(options.equipment, total_harvest);
      }

      var excesseProduce = (total_harvest - items) * crop.harvests;
      if (excesseProduce < 0) excesseProduce = 0;

      items = items * crop.harvests;

      if (excesseProduce < forSeeds) items = items - forSeeds + excesseProduce; //use unused produce for seeds

      if (items < 0) items = 0; //because ancient fruit may not yield any produce resulting in negativ profit

      if (options.produce == 1)
        netIncome +=
          items *
          (crop.produce.jar != null
            ? crop.produce.jar
            : crop.produce.price * 2 + 50);
      else if (options.produce == 2)
        netIncome +=
          items *
          (crop.produce.keg != null
            ? crop.produce.keg * caskModifier
            : crop.produce.price * kegModifier * caskModifier);

      if (options.skills.arti) {
        netIncome *= 1.4;
      }
    }

    // Determine expenses
    if (options.buySeed) {
      netExpenses += crop.seedLoss;
      // console.log("Profit (After seeds): " + profit);
    }

    if (options.buyFert) {
      netExpenses += crop.fertLoss;
      // console.log("Profit (After fertilizer): " + profit);
    }

    // Determine total profit
    totalProfit = netIncome + netExpenses;
    if (netExpenses != 0) {
      totalReturnOnInvestment = 100 * (totalProfit / -netExpenses); // Calculate the return on investment and scale it to a % increase
      if (crop.growth.regrow == 0) {
        averageReturnOnInvestment = totalReturnOnInvestment / crop.growth.initial;
      } else {
        averageReturnOnInvestment = totalReturnOnInvestment / options.days;
      }
    } else {
      totalReturnOnInvestment = 0;
      averageReturnOnInvestment = 0;
    }

    profitData = {};
    profitData.totalReturnOnInvestment = totalReturnOnInvestment;
    profitData.averageReturnOnInvestment = averageReturnOnInvestment;
    profitData.netExpenses = netExpenses;
    profitData.profit = totalProfit;
    profitData.ratioN = ratioN;
    profitData.ratioS = ratioS;
    profitData.ratioG = ratioG;
    profitData.ratioI = ratioI;

    // console.log("Profit: " + profit);
    return profitData;
  };

  /*
   * Performs filtering on a season's crop list, saving the new list to the cropList array.
   */
  const filterCropsBySeason = () => {
    cropList = [];

    var season = seasons[options.season];

    for (var i = 0; i < season.crops.length; i++) {
      if (
        (options.seeds.pierre && season.crops[i].seeds.pierre != 0) ||
        (options.seeds.joja && season.crops[i].seeds.joja != 0) ||
        (options.seeds.special && season.crops[i].seeds.specialLoc != "")
      ) {
        cropList.push(JSON.parse(JSON.stringify(season.crops[i])));
        cropList[cropList.length - 1].id = i;
      }
    }
  };
  useEffect(() => { }, []);

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
        selectedValue={selectedCrop}
        onValueChange={(cropKey, itemIndex) => {
          console.log("setchange", cropKey);
          setSelectedCrop(cropKey);
          const profitData = calculateProfit(crops[cropKey]);
          setProfit(crops[cropKey].produce.price * 2);
          setProfitData(profitData);
        }}
      >
        {Object.keys(crops).map((cropKey, i) => {
          return <Picker.Item label={cropKey} value={cropKey} key={i} />;
        })}
      </Picker>
      <Picker
        selectedValue={selectedSeason}
        onValueChange={(seasonKey, itemIndex) => {
          setSelectedSeason(seasonKey);
        }}
      >
        <Picker.Item label={"Spring"} value={"spring"} />;
        <Picker.Item label={"Summer"} value={"summer"} />;
        <Picker.Item label={"Fall"} value={"fall"} />;
        <Picker.Item label={"Winter"} value={"winter"} />;
        <Picker.Item label={"Greenhouse"} value={"greenhouse"} />;
      </Picker>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Stardew Valley Copilot!</ThemedText>
        <Carrot />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{crops[selectedCrop].name}</ThemedText>
        <ThemedText>Total Profit: {profit} </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Crop Info </ThemedText>
        <ThemedText>
          Value (Normal): {crops[selectedCrop].produce.price}{" "}
        </ThemedText>
        <ThemedText>
          Seeds (Pierre): {crops[selectedCrop].seeds.pierre}
        </ThemedText>
        <ThemedText>Seeds (Joja): {crops[selectedCrop].seeds.joja}</ThemedText>
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
