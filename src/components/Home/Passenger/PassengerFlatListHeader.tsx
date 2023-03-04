import { StyleSheet, TouchableOpacity, View } from "react-native"
import React from "react"
import { useAppSelector } from "../../../redux/app/rtkHooks"
import OriginalLoader from "../../UI/OriginalLoader"
import { Card, Divider, Paragraph } from "react-native-paper"
import { Feather } from "@expo/vector-icons"
import { themeColors } from "../../../config/themeColors"

type Props = {
  numPassengerTours: number
  isShown: boolean
  numPassengerToursTaken: number
  numPassengerToursAvail: number
  handleChevronLongPress: () => void
  handleInfoOnPress: () => void
  setIsShown: (args?: any) => void
}

const PassengerFlatListHeader = ({ ...props }: Props) => {
  const passengerTour = useAppSelector((state) => state.passengertour)
  return (
    <View style={styles.headerWrapper}>
      <React.Fragment>
        {passengerTour.status === "loading" && (
          <View
            style={{
              marginTop: "2%",
            }}
          >
            <OriginalLoader />
          </View>
        )}
        {passengerTour.tours.length ? (
          <Card mode="outlined" style={styles.cardContainerHeader}>
            <Card.Content>
              <View style={styles.spaceBetween}>
                {passengerTour.status === "loading" ? (
                  <Paragraph
                    style={{ color: "gray", ...styles.cardContentText }}
                  >
                    Please wait
                  </Paragraph>
                ) : (
                  <>
                    <Paragraph
                      style={{ color: "gray", ...styles.cardContentText }}
                    >
                      All your tours
                    </Paragraph>
                    <Paragraph
                      style={{ color: "gray", ...styles.cardContentText }}
                    >
                      {props.numPassengerTours}
                    </Paragraph>
                  </>
                )}
              </View>

              {props.isShown && (
                <>
                  <Divider />
                  <View style={styles.spaceBetween}>
                    <Paragraph
                      style={{
                        color:
                          passengerTour.status === "loading"
                            ? "gray"
                            : themeColors.googleBlue,
                        ...styles.cardContentText,
                      }}
                    >
                      {passengerTour.status === "loading"
                        ? "Please wait"
                        : "Your booked tours"}
                    </Paragraph>
                    <Paragraph
                      style={{
                        color: themeColors.googleBlue,
                        ...styles.cardContentText,
                      }}
                    >
                      {passengerTour.status === "loading"
                        ? ""
                        : props.numPassengerToursTaken}
                    </Paragraph>
                  </View>
                  <Divider />
                  <View style={styles.spaceBetween}>
                    <Paragraph
                      style={{
                        color:
                          passengerTour.status === "loading"
                            ? "gray"
                            : "orange",
                        ...styles.cardContentText,
                      }}
                    >
                      {passengerTour.status === "loading"
                        ? "Please wait"
                        : "Your pending tours"}
                    </Paragraph>
                    <Paragraph
                      style={{
                        color: "orange",
                        ...styles.cardContentText,
                      }}
                    >
                      {passengerTour.status === "loading"
                        ? ""
                        : props.numPassengerToursAvail}
                    </Paragraph>
                  </View>
                </>
              )}
              <View style={styles.flexRow}>
                <TouchableOpacity
                  disabled={passengerTour.status === "loading"}
                  onLongPress={props.handleChevronLongPress}
                  onPress={() => props.setIsShown(!props.isShown)}
                >
                  <Feather
                    name={props.isShown ? "chevron-up" : "chevron-down"}
                    selectable={false}
                    size={20}
                    color={"gray"}
                    style={{
                      marginRight: "5%",
                    }}
                  />
                </TouchableOpacity>
                {props.isShown && (
                  <TouchableOpacity
                    style={{ position: "absolute", right: 0 }}
                    disabled={passengerTour.status === "loading"}
                    onPress={props.handleInfoOnPress}
                  >
                    <Feather
                      name="info"
                      selectable={false}
                      size={20}
                      color={"gray"}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </Card.Content>
          </Card>
        ) : null}
      </React.Fragment>
    </View>
  )
}

export default PassengerFlatListHeader

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: "white",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 1,
    marginBottom: "2%",
  },
  chipStyle: {
    height: 35,
    backgroundColor: "white",
    borderColor: themeColors.googleLightGray,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    borderRadius: 4,
  },
  chipWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "2%",
    marginHorizontal: "2%",
  },
  spaceBetween: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardContentText: {
    fontSize: 14,
    marginVertical: 12,
    fontWeight: "normal",
  },
  cardContainer: {
    marginTop: "1%",
    marginBottom: "1%",
    marginHorizontal: "2%",
    backgroundColor: "white",
    borderRadius: 4,
    padding: 0,
    borderColor: themeColors.googleLightGray,
  },
  cardContainerHeader: {
    marginTop: "1%",
    marginBottom: "1%",
    marginHorizontal: "2%",
    backgroundColor: "white",
    borderRadius: 4,
    padding: 0,
    borderColor: "transparent",
  },
})
