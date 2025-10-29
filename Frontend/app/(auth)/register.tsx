import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import { At, Lock, User } from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import { useAuth } from "@/authContext/authContext";

const register = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { signUp } = useAuth();

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Sign Up", "Please fill all the fields");
      return;
    }
    try {
      setIsLoading(true);
      await signUp(nameRef.current, emailRef.current, passwordRef.current);
      // router.replace("/(main)/home");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScreenWrapper showPattern={true}>
        <View style={styles.container}>
          <View style={styles.header}>
            <BackButton />
            <Typo size={17} color={colors.white}>
              Need some help?
            </Typo>
          </View>

          <View style={styles.content}>
            <ScrollView
              contentContainerStyle={styles.form}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }}>
                <Typo size={28} fontWeight={"600"}>
                  Getting Started
                </Typo>
                <Typo color={colors.neutral600}>
                  Create an account to continue
                </Typo>
              </View>

              <Input
                placeholder="Enter your Name"
                onChangeText={(value) => (nameRef.current = value)}
                icon={
                  <User size={verticalScale(26)} color={colors.neutral600} />
                }
              />
              <Input
                placeholder="Enter your Email"
                onChangeText={(value) => (emailRef.current = value)}
                icon={<At size={verticalScale(26)} color={colors.neutral600} />}
              />
              <Input
                placeholder="Enter your Password"
                secureTextEntry
                onChangeText={(value) => (passwordRef.current = value)}
                icon={
                  <Lock size={verticalScale(26)} color={colors.neutral600} />
                }
              />

              <View style={{ marginTop: spacingY._25, gap: spacingY._15 }}>
                <Button loading={isLoading} onPress={() => handleSubmit()}>
                  <Typo fontWeight={"bold"}>Sign Up</Typo>
                </Button>
                <View style={styles.footer}>
                  <Typo color={colors.neutral600}>
                    Already have an account?
                  </Typo>
                  <TouchableOpacity onPress={() => router.push("/login")}>
                    <Typo color={colors.primary} fontWeight={"bold"}>
                      Login
                    </Typo>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._25,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._50,
    borderTopRightRadius: radius._50,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._20,
  },
  form: {
    gap: spacingY._20,
    marginTop: spacingY._20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
