import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { useAuth } from "@/authContext/authContext";
import { colors } from "@/constants/theme";
import Button from "@/components/Button";

const Home = () => {
  const { user, signOut } = useAuth();
  const handleLogout = () => {
    signOut();
  };
  return (
    <ScreenWrapper>
      <Typo color={colors.white}>Home</Typo>
      <Typo color={colors.white}>{user?.name}</Typo>

      <Button onPress={handleLogout}>
        <Typo>Logout</Typo>
      </Button>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
