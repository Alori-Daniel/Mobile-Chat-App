import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";

const register = () => {
  return (
    <ScreenWrapper>
      <View>
        <Typo size={23} fontWeight="bold" color={colors.white}>
          register
        </Typo>
      </View>
    </ScreenWrapper>
  );
};

export default register;

const styles = StyleSheet.create({});
