import {
  Platform,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Avatar from "@/components/Avatar";
import { PencilIcon, SignOutIcon } from "phosphor-react-native";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import { useAuth } from "@/authContext/authContext";
import { useEffect } from "react";
import { UserDataProps } from "@/types";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { useRouter } from "expo-router";
import { updateProfile } from "@/socket/socketEvents";
import * as ImagePicker from "expo-image-picker";
import { uploadFileToCloudinary } from "@/services/imageService";

const ProfieModal = () => {
  const { user, signOut, updateToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState<UserDataProps>({
    name: "",
    email: "",
    avatar: null,
  });

  useEffect(() => {
    updateProfile(processUpdateProfile);

    return () => {
      updateProfile(processUpdateProfile, true);
    };
  }, []);
  const processUpdateProfile = (res: any) => {
    console.log("data respoonse update", res);
    setLoading(false);

    if (res.success) {
      updateToken(res.data.token);
      router.back();
    } else {
      Alert.alert("User", res.message);
    }
  };
  useEffect(() => {
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || null,
    });
  }, [user]);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    console.log(result);
    if (!result.canceled) {
      setUserData({
        ...userData,
        avatar: result.assets[0],
      });
    }
  };

  const handleLogout = async () => {
    router.back();

    await signOut();
    console.log("signed out");
  };
  const showLogoutAlert = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => handleLogout(),
      },
    ]);
  };

  const onSubmit = async () => {
    let { name, avatar } = userData;
    console.log(name, avatar);
    if (!name.trim()) {
      Alert.alert("User", "plss enter your name");
      return;
    }

    let data = {
      name,
      avatar,
    };
    if (avatar && avatar?.uri) {
      setLoading(true);
      const res = await uploadFileToCloudinary(avatar, "profiles");
      console.log("res,", res);

      if (res.success) {
        data.avatar = res.data;
      } else {
        setLoading(false);
        Alert.alert("User", res.msg);
        return;
      }
    }
    // console.log(data);

    setLoading(true);
    updateProfile(data);
  };
  console.log("data", userData);

  return (
    <ScreenWrapper isModal={true}>
      <View style={styles.container}>
        <Header
          title="Update Profile"
          leftIcon={
            Platform.OS === "android" && <BackButton color={colors.black} />
          }
          style={{ marginVertical: spacingY._15 }}
        />
        {/* Form */}
        <ScrollView contentContainerStyle={styles.form}>
          <View
            style={[
              styles.avatarContainer,
              //   { borderWidth: 1, borderColor: colors.neutral500 },
            ]}
          >
            <Avatar uri={userData.avatar} size={170} />
            <TouchableOpacity style={styles.editIcon} onPress={onPickImage}>
              <PencilIcon
                weight="fill"
                size={verticalScale(20)}
                color={colors.neutral800}
              />
            </TouchableOpacity>
          </View>

          <View style={{ gap: spacingY._20 }}>
            <View style={styles.inputContainer}>
              <Typo
                style={{ paddingLeft: spacingX._10 }}
                size={16}
                fontWeight={"600"}
              >
                Email
              </Typo>
              <Input
                value={userData.email}
                containerStyle={{
                  borderColor: colors.neutral350,
                  paddingLeft: spacingX._20,
                  backgroundColor: colors.neutral300,
                }}
                onChangeText={(value) =>
                  setUserData({ ...userData, email: value })
                }
                editable={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Typo
                style={{ paddingLeft: spacingX._10 }}
                size={16}
                fontWeight={"600"}
              >
                Name
              </Typo>
              <Input
                value={userData.name}
                containerStyle={{
                  borderColor: colors.neutral350,
                  paddingLeft: spacingX._20,
                  //   backgroundColor: colors.neutral300,
                }}
                onChangeText={(value) =>
                  setUserData({ ...userData, name: value })
                }
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {!loading && (
          <Button
            style={{
              backgroundColor: colors.rose,
              height: verticalScale(56),
              width: verticalScale(56),
            }}
            onPress={showLogoutAlert}
          >
            <SignOutIcon
              size={verticalScale(30)}
              color={colors.white}
              weight="fill"
            />
          </Button>
        )}

        <Button
          style={{
            flex: 1,
          }}
          onPress={onSubmit}
          loading={loading}
        >
          <Typo size={16} fontWeight={"600"} color={colors.black}>
            Update
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default ProfieModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral200,
    marginBottom: spacingY._10,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignItems: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._7,
    right: spacingY._60,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._7,
  },
});
