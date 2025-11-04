import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { useAuth } from "@/authContext/authContext";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Button from "@/components/Button";
import { useEffect } from "react";
import {
  getConversation,
  newConversation,
  testSocket,
} from "@/socket/socketEvents";
import { verticalScale } from "@/utils/styling";
import { GearSixIcon, Plus } from "phosphor-react-native";
import { useRouter } from "expo-router";
import ConversationItem from "@/components/ConversationItem";
import Loading from "@/components/Loading";
import { ConversationProps, ResponseProps } from "@/types";
const Home = () => {
  const { user: currentUser, signOut } = useAuth();
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    getConversation(processConversation);
    newConversation(newConversationHandler);
    getConversation(null);

    return () => {
      getConversation(processConversation, true);
      newConversation(newConversationHandler, true);
    };
  }, []);
  const processConversation = (res: ResponseProps) => {
    console.log("got response from getConversation event is data", res);
    if (res.success) {
      setConversations(res.data);
    }
  };
  const newConversationHandler = (res: ResponseProps) => {
    console.log("got response from newConversation event is data", res);
    if (res.success && res.data.isNew == true) {
      setConversations((prev) => [...prev, res.data]);
    }
  };
  // const conversations = [
  //   {
  //     name: "Alice",
  //     type: "direct",
  //     lastMessage: {
  //       senderName: "Alice",
  //       content: "Hello how is it going",
  //       createdAt: "2024-11-01T14:39:08.000Z",
  //     },
  //   },
  //   {
  //     name: "Peace",
  //     type: "direct",
  //     lastMessage: {
  //       senderName: "Alice",
  //       content: "Hello how is it going",
  //       createdAt: "2025-11-03T14:39:00.000Z",
  //     },
  //   },
  //   {
  //     name: "James",
  //     type: "direct",
  //     lastMessage: {
  //       senderName: "Alice",
  //       content: "Hello how is it going",
  //       createdAt: "2025-11-03T14:39:00.000Z",
  //     },
  //   },
  //   {
  //     name: "Jake Group",
  //     type: "group",
  //     lastMessage: {
  //       senderName: "Alice",
  //       content: "Hello how is it going",
  //       createdAt: "2025-11-03T14:39:00.000Z",
  //     },
  //   },
  //   {
  //     name: "Paul Group",
  //     type: "group",
  //     lastMessage: {
  //       senderName: "Alice",
  //       content: "Hello how is it going",
  //       createdAt: "2025-11-03T14:39:00.000Z",
  //     },
  //   },
  // ];
  let directConversations = conversations
    .filter((item: ConversationProps) => item.type == "direct")
    .sort((a: ConversationProps, b: ConversationProps) => {
      const aDate = a?.lastMessage?.createdAt || a.createdAt;
      const bDate = b?.lastMessage?.createdAt || b.createdAt;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });
  let groupConversations = conversations
    .filter((item: ConversationProps) => item.type == "group")
    .sort((a: ConversationProps, b: ConversationProps) => {
      const aDate = a?.lastMessage?.createdAt || a.createdAt;
      const bDate = b?.lastMessage?.createdAt || b.createdAt;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });
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
        <View style={styles.content}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: spacingY._20 }}
          >
            <View style={styles.navBar}>
              <View style={styles.tabs}>
                <TouchableOpacity
                  style={[
                    styles.tabStyle,
                    selectedTab === 0 && styles.activeTabStyle,
                  ]}
                  onPress={() => setSelectedTab(0)}
                >
                  <Typo size={16} fontWeight={"600"}>
                    Direct Messages
                  </Typo>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabStyle,
                    selectedTab === 1 && styles.activeTabStyle,
                  ]}
                  onPress={() => setSelectedTab(1)}
                >
                  <Typo size={16} fontWeight={"600"}>
                    Groups
                  </Typo>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.conversationList}>
              {selectedTab === 0 &&
                directConversations.map(
                  (item: ConversationProps, index: number) => {
                    return (
                      <ConversationItem
                        key={index}
                        item={item}
                        router={router}
                        showDivider={directConversations.length != index + 1}
                      />
                    );
                  }
                )}
              {selectedTab === 1 &&
                groupConversations.map(
                  (item: ConversationProps, index: number) => {
                    return (
                      <ConversationItem
                        key={index}
                        item={item}
                        router={router}
                        showDivider={groupConversations.length != index + 1}
                      />
                    );
                  }
                )}
            </View>
            {!loading &&
              selectedTab == 0 &&
              directConversations.length == 0 && (
                <Typo style={{ textAlign: "center" }}>
                  no direct conversations
                </Typo>
              )}
            {!loading && selectedTab == 1 && groupConversations.length == 0 && (
              <Typo style={{ textAlign: "center" }}>
                You havent joined any groups
              </Typo>
            )}
            {loading && <Loading />}
          </ScrollView>
        </View>
      </View>

      <Button
        style={styles.floatingButton}
        onPress={() =>
          router.push({
            pathname: "/(main)/newConversationModal",
            params: {
              isGroup: selectedTab,
            },
          })
        }
      >
        <Plus weight="bold" size={verticalScale(24)} color={colors.black} />
      </Button>
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
