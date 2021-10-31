import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";
import QRCode from "react-native-qrcode-svg";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { OverlayContainer } from "../containers/OverlayContainer";

export const VerifyCode = ({
  visible,
  toggleOverlay,
  provider,
  name,
  description,
  date_of_booking,
  date_of_avail,
  personName,
  personPhoto,
}) => {
  const verifyMeCache = FileSystem.cacheDirectory + "verifyMe/";
  const [message, setMessage] = useState("");
  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status && !status.granted) requestPermission();
  let svg = null;

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(verifyMeCache);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(verifyMeCache, {
        intermediates: true,
      });
    }
  };

  const downloadCode = () => {
    svg.toDataURL(async (data) => {
      let filename = `${name}_${provider}.png`;
      filename = filename.replace(",", "_");
      filename = filename.replace("-", "_");
      filename = filename.replace(/ /g, "_");
      await ensureDirExists();
      const fileUri = verifyMeCache + filename;
      try {
        await FileSystem.writeAsStringAsync(fileUri, data, {
          encoding: FileSystem.EncodingType.Base64,
        });
        let album = await MediaLibrary.getAlbumAsync("Verify Me");
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        if (!album) {
          await MediaLibrary.createAlbumAsync("Verify Me", asset);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album);
        }
        setMessage("QR Code has been saved in your photo gallery");
        setTimeout(() => {
          setMessage("");
        }, 3500);
      } catch (err) {}
    });
  };

  return (
    <OverlayContainer visible={visible} toggleOverlay={toggleOverlay}>
      <Text
        style={{
          fontSize: 23,
          marginBottom: 20,
          textDecorationLine: "underline",
        }}
      >
        Scan To Verify
      </Text>
      {message.length > 0 ? (
        <Text style={{ textAlign: "center", margin: 10, color: "green" }}>
          {message}
        </Text>
      ) : null}
      <QRCode
        value={JSON.stringify({
          provider,
          name,
          description,
          date_of_booking,
          date_of_avail,
          personName,
          personPhoto,
        })}
        size={300}
        getRef={(c) => (svg = c)}
      />
      <View style={{ marginTop: 20 }} />
      <Button title={"Download QR Code"} onPress={downloadCode} />
    </OverlayContainer>
  );
};
