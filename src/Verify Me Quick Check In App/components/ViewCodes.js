import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import * as MediaLibrary from "expo-media-library";
import { Card } from "react-native-elements";

export const ViewCodes = ({ back }) => {
  const [assets, setAssets] = useState([]);

  const viewQRCodes = async () => {
    const album = await MediaLibrary.getAlbumAsync("Verify Me");
    const assetList = await MediaLibrary.getAssetsAsync({ album });
    const { assets } = assetList;
    setAssets(assets);
  };

  useEffect(() => {
    viewQRCodes();
  }, []);

  const getCards = () => {
    return assets.map((asset) => (
      <Card containerStyle={{ marginTop: 20 }} key={asset.id}>
        <View
          style={{
            width: 300,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Image
            source={{
              uri: asset.uri,
            }}
            style={{ width: 250, height: 250 }}
          />
          <Text style={{ marginTop: 10, fontSize: 17, textAlign: "center" }}>
            {asset.filename}
          </Text>
        </View>
      </Card>
    ));
  };

  return (
    <>
      <Icon
        name="back"
        size={30}
        color="#900"
        style={{ marginLeft: 20, marginTop: 20 }}
        onPress={back}
      />
      <ScrollView
        style={{ width: "95%", marginLeft: "2.5%" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            textDecorationLine: "underline",
          }}
        >
          View Download QR Codes
        </Text>
        {getCards()}
        <View style={{ margin: 50 }} />
      </ScrollView>
    </>
  );
};
