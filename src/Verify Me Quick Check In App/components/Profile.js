import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import * as Clipboard from "expo-clipboard";
import { BACKEND_URL } from "../constants";

export const Profile = ({ aadhar }) => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const getNewToken = async () => {
    const response = await axios.post(BACKEND_URL + "user/token", { aadhar });
    const { data } = response;
    const { token } = data;
    setToken(token);
  };

  const copyToken = () => {
    Clipboard.setString(token);
    setMessage("Previous token has been copied to your clipboard");
    setTimeout(() => {
      setMessage("");
    }, 3500);
    getNewToken();
  };

  useEffect(() => {
    getNewToken();
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          textDecorationLine: "underline",
          marginTop: 20,
        }}
      >
        One-Time Personal Token
      </Text>
      {message.length > 0 ? (
        <Text style={{ color: "green", marginTop: 10, fontSize: 15 }}>
          {message}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={copyToken}
        style={{
          marginTop: 30,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
          borderWidth: 1,
          borderColor: "gray",
        }}
      >
        <Text style={{ fontSize: 18 }}>{token}</Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "200",
          marginTop: 5,
        }}
      >
        Click on the token to copy it
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "400",
          textDecorationLine: "underline",
          marginTop: 40,
        }}
      >
        What's a Personal Token and How to Use It
      </Text>
      <View style={{ marginTop: 10, width: "90%" }}>
        <Text style={{ marginTop: 20, fontSize: 17, fontWeight: "300" }}>
          1. The token generated is used by third party services to make
          bookings on your behalf
        </Text>
        <Text style={{ marginTop: 20, fontSize: 17, fontWeight: "300" }}>
          2. Copy this token and provide it to third party services when they
          ask for Verify Me App token
        </Text>
        <Text style={{ marginTop: 20, fontSize: 17, fontWeight: "300" }}>
          3. This token is for one-time use. Once used, this token would be
          invalidated.
        </Text>
        <Text style={{ marginTop: 20, fontSize: 17, fontWeight: "300" }}>
          4. Do not provide the same token to multiple service providers. Only
          one of them would be able to make a booking on your behalf with the
          same token.
        </Text>
      </View>
    </View>
  );
};
