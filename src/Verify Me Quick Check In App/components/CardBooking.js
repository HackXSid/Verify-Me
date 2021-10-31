import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import { VerifyCode } from "./VerifyCode";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  paragraph: {
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 10,
    color: "#34495e",
  },
  subparagraph: {
    fontSize: 15,
    fontWeight: "400",
    paddingBottom: 7,
    color: "#34495e",
    flexWrap: "wrap",
    flex: 1,
  },
  card: {
    display: "flex",
    flexDirection: "row",
  },
  cardInfo: {
    marginTop: 10,
    marginLeft: 15,
    flexDirection: "column",
    maxWidth: "75%",
  },
});

export const CardBooking = ({
  image,
  provider,
  name,
  description,
  date_of_booking,
  date_of_avail,
  personName,
  personPhoto,
}) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return (
    <View style={styles.container}>
      <VerifyCode
        visible={overlayVisible}
        toggleOverlay={() => setOverlayVisible(!overlayVisible)}
        provider={provider}
        name={name}
        description={description}
        date_of_booking={date_of_booking}
        date_of_avail={date_of_avail}
        personName={personName}
        personPhoto={personPhoto}
      />
      <Card>
        <View style={styles.card}>
          <Image
            source={{
              uri: image,
            }}
            style={{ resizeMode: "contain", width: "25%" }}
          />
          <View style={styles.cardInfo}>
            <Text style={styles.paragraph}>{name}</Text>
            <Text style={styles.subparagraph}>
              Service Provider : {provider}
            </Text>
            <Text
              style={styles.subparagraph}
            >{`Booking Date : ${date_of_avail.toLocaleDateString(
              undefined,
              options
            )}`}</Text>
            <Text
              style={styles.subparagraph}
            >{`Created On : ${date_of_booking.toLocaleDateString(
              undefined,
              options
            )}`}</Text>
          </View>
        </View>
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginTop: 15,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          onPress={() => setOverlayVisible(true)}
          title="Verify Booking"
        />
      </Card>
    </View>
  );
};
