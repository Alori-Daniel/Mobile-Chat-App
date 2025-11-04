import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { useLocalSearchParams } from "expo-router";

const Conversation = () => {
  const data = useLocalSearchParams();
  //   console.log("data", data);

  return (
    <ScreenWrapper>
      <Typo size={20} color={colors.white} fontWeight={"600"}>
        Conversation
      </Typo>
    </ScreenWrapper>
  );
};

export default Conversation;

const styles = StyleSheet.create({});
