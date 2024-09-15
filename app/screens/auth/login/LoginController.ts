import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '@/navigation/RootNavigation'

const LoginController = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    
  const handleLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AppNavigation', params: { screen: 'HomeScreen'}}],
    });
  };

  return {
    handleLogin,
  };
}

export default LoginController;
