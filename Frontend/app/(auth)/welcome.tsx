import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { Stack, useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import Button from "@/components/Button";

const welcome = () => {
  const router = useRouter();

  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.5}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Typo size={43} color={colors.white} fontWeight="900">
            Bubbly
          </Typo>

          <Animated.Image
            source={require("../../assets/images/welcome.png")}
            style={styles.welcomeImage}
            entering={FadeInDown.duration(700).springify()}
            resizeMode={"contain"}
          />

          <View>
            <Typo size={33} color={colors.white} fontWeight="800">
              Stay Connected
            </Typo>
            <Typo size={33} color={colors.white} fontWeight="800">
              with your loved ones
            </Typo>
            <Typo size={33} color={colors.white} fontWeight="800">
              and family
            </Typo>
          </View>
        </View>
        <Button
          style={{ backgroundColor: colors.white }}
          loading={false}
          onPress={() => {
            router.push("/(auth)/register");
          }}
        >
          <Typo size={23} fontWeight={"bold"}>
            Get Started
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: spacingX._20,
    marginVertical: spacingY._10,
  },
  background: {
    flex: 1,
    backgroundColor: colors.neutral900,
  },
  welcomeImage: {
    height: verticalScale(300),
    aspectRatio: 1,
    resizeMode: "contain",
  },
});
