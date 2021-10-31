import React, { useEffect } from "react";
import { Image, View } from "react-native";

export const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  });
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Image
        style={{ width: 300, height: 200 }}
        source={require("../assets/logo_transparent.png")}
      />
    </View>
  );
};
