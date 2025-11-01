import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { useAuth } from "@/authContext/authContext";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Button from "@/components/Button";
import { useEffect } from "react";
import { testSocket } from "@/socket/socketEvents";
import { verticalScale } from "@/utils/styling";
import { GearSixIcon } from "phosphor-react-native";
import { useRouter } from "expo-router";
const Home = () => {
  const { user: currentUser, signOut } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    signOut();
  };

  // useEffect(() => {
  //   testSocket(testSocketCallbackHandler);
  //   testSocket(null);

  //   return () => {
  //     testSocket(testSocketCallbackHandler, true);
  //   };
  // }, []);
  // const testSocketCallbackHandler = (data: any) => {
  //   console.log("got response from testSocket event is data", data);
  // };
  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.4}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Typo
              size={19}
              color={colors.white}
              textProps={{ numberOfLines: 1 }}
            >
              Welcome back,{" "}
              <Typo color={colors.white} size={20} fontWeight={"800"}>
                {currentUser?.name}
              </Typo>
              {""}
              👌🏼
            </Typo>
          </View>
          <TouchableOpacity
            style={styles.settingIcon}
            onPress={() => {
              router.push("/(main)/profileModal");
            }}
          >
            <GearSixIcon
              weight="fill"
              size={verticalScale(22)}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}></View>
      </View>

      {/* <Button onPress={handleLogout}>
        <Typo>Logout</Typo>
      </Button> */}
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._20,
    gap: spacingY._15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._50,
    borderTopRightRadius: radius._50,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._20,
    overflow: "hidden",
  },

  navBar: {
    flexDirection: "row",
    gap: spacingX._15,
    alignItems: "center",
    paddingHorizontal: spacingX._10,
  },
  tabs: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacingY._10,
  },
  tabStyle: {
    paddingVertical: spacingY._10,
    paddingHorizontal: spacingX._20,
    borderRadius: radius.full,
    backgroundColor: colors.neutral100,
  },
  activeTabStyle: {
    backgroundColor: colors.primaryLight,
  },
  conversationList: {
    flex: 1,
    paddingVertical: spacingY._20,
  },
  settingIcon: {
    padding: spacingY._10,
    backgroundColor: colors.neutral700,
    borderRadius: radius.full,
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,

    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30),
  },
});
