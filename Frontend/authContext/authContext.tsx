import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { login, register } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateToken: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedTokenProps>(storedToken);
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          // token has expired, navigat eto welcoe page
          await AsyncStorage.removeItem("token");
          gotoWelcomePage();
        }
        // user is locged in
        console.log(decoded);

        setToken(storedToken);
        setUser(decoded.user);
        gotoHomePage();
      } catch (error) {
        gotoWelcomePage();
      }
    } else {
      gotoWelcomePage();
    }
  };

  const gotoHomePage = () => {
    setTimeout(() => {
      router.replace("/(main)/home");
    }, 1500);
  };

  const gotoWelcomePage = () => {
    setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 1500);
  };
  const updateToken = async (token: string) => {
    if (!token) return;
    setToken(token);
    await AsyncStorage.setItem("token", token);
    const decode = jwtDecode<DecodedTokenProps>(token);
    console.log("Decoded Token", decode);

    setUser(decode.user);
  };
  const signIn = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      updateToken(response.token);
      router.replace("/(main)/home");
    } catch (error: any) {
      Alert.alert("Sign Up", error.message);

      console.log(error);
    }
  };
  const signUp = async (
    name: string,
    email: string,
    password: string,
    avatar?: string
  ) => {
    try {
      const response = await register(name, email, password, avatar);
      updateToken(response.token);
      console.log("User", response.data);
      console.log("Token", response.token);

      router.replace("/(main)/home");
    } catch (error: any) {
      Alert.alert("Sign Up", error.message);
      //   console.log(error.message);
    }
  };
  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    router.replace("/(auth)/welcome");
  };
  return (
    <AuthContext.Provider
      value={{
        token: token,
        user: user,
        signIn: signIn,
        signUp: signUp,
        signOut: signOut,
        updateToken: updateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
