import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Avatar from "@/components/Avatar";
import Typo from "@/components/Typo";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import * as ImagePicker from "expo-image-picker";
import Input from "@/components/Input";
import { useAuth } from "@/authContext/authContext";
import Button from "@/components/Button";
import { verticalScale } from "@/utils/styling";
const newConversationModal = () => {
  const { isGroup } = useLocalSearchParams();
  const isGroupMode = isGroup === "1";

  const contacts = [
    {
      id: 1,
      name: "Alice",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 2,
      name: "Bob",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 3,
      name: "Charlie",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 4,
      name: "David",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 5,
      name: "Eve",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 6,
      name: "Eve",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 7,
      name: "Eve",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 8,
      name: "Eve",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ];
  const [groupAvatar, setGroupAvatar] = useState<{ uri: string } | null>(null);
  const [groupName, setGroupName] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const { user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    console.log(result);
    if (!result.canceled) {
      setGroupAvatar(result.assets[0]);
    }
  };
  const toggleParticipant = (user: any) => {
    setSelectedParticipants((prev: any) => {
      if (prev.includes(user.id)) {
        return prev.filter((id: string) => id !== user.id);
      } else {
        return [...prev, user.id];
      }
    });
  };
  const onSelectUser = (user: any) => {
    if (!currentUser) {
      Alert.alert("Authentication", "Pls Login First");
      return;
    }
    if (isGroupMode) {
      toggleParticipant(user);
    } else {
    }
  };
  const createGroup = () => {
    if (!groupName.trim() || !currentUser || selectedParticipants.length < 2)
      return;

    //todo create group
  };
  return (
    <ScreenWrapper isModal={true}>
      <View style={styles.container}>
        <Header
          title={isGroupMode ? "New Group" : "New Conversation"}
          leftIcon={<BackButton color={colors.black} />}
        />
        {isGroupMode && (
          <View style={styles.groupInfoContainer}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={onPickImage}>
                <Avatar
                  size={100}
                  uri={groupAvatar?.uri || null}
                  isGroup={true}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.groupNameContainer}>
              <Input
                placeholder="Group Name"
                value={groupName}
                onChangeText={setGroupName}
              />
            </View>
          </View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contactList}
        >
          {contacts.map((user: any, index: number) => {
            const isSelected = selectedParticipants.includes(user.id);
            return (
              <TouchableOpacity
                style={[
                  styles.contactRow,
                  isSelected && styles.selectedContact,
                ]}
                key={index}
                onPress={() => onSelectUser(user)}
              >
                <Avatar uri={user.avatar} size={47} />
                <Typo size={16} fontWeight={"500"}>
                  {user.name}
                </Typo>
                {isGroupMode && (
                  <View style={styles.selectionIndicator}>
                    <View
                      style={[
                        styles.checkbox,
                        isSelected ? styles.checked : null,
                      ]}
                    ></View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {isGroupMode && selectedParticipants.length >= 2 && (
          <View>
            <Button
              onPress={createGroup}
              disabled={!groupName.trim()}
              loading={isLoading}
            >
              <Typo size={16} fontWeight={"600"}>
                Create Group
              </Typo>
            </Button>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default newConversationModal;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacingX._15,
    flex: 1,
  },
  groupInfoContainer: {
    alignItems: "center",
    marginTop: spacingY._10,
  },
  avatarContainer: {
    marginBottom: spacingY._10,
  },
  groupNameContainer: {
    width: "100%",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
    paddingVertical: spacingY._5,
  },
  selectedContact: {
    backgroundColor: colors.neutral100,
    borderRadius: radius._15,
  },
  contactList: {
    gap: spacingY._12,
    marginTop: spacingY._10,
    paddingTop: spacingY._10,
    paddingBottom: verticalScale(150),
  },
  selectionIndicator: {
    marginLeft: "auto",
    marginRight: spacingX._10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  checked: {
    backgroundColor: colors.primary,
  },
  createGroupButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacingX._15,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._50,
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
  },
});
