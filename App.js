import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker,
  ImageBackground,
  Image,
  Dimensions
} from "react-native";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      sols: [],
      lastSol: 250,
      maxT: 10,
      minT: -30,
      windS: 10,
      windD: "West",
      season: "Fall",
      marsData: {},
      sol_selected: 0,
      key: "TFesgKlVUqu2eKmbUpgoH87XHxWJVgzKM110ryQQ"
    };
  }

  componentDidMount() {
    fetch(
      "https://api.nasa.gov/insight_weather/?api_key=TFesgKlVUqu2eKmbUpgoH87XHxWJVgzKM110ryQQ&feedtype=json&ver=1.0"
    )
      .then(response => response.json())
      .then(responseJson => {
        var solArray = responseJson.sol_keys;
        var maxDay = solArray[solArray.length - 1];
        this.setState({
          sol_selected: maxDay,
          loading: false,
          marsData: responseJson,
          sols: solArray,
          lastSol: maxDay,
          season: responseJson[maxDay].Season,
          maxT: responseJson[maxDay].AT.mx,
          minT: responseJson[maxDay].AT.mn,
          windS: responseJson[maxDay].HWS.av,
          windD: responseJson[maxDay].WD.most_common.compass_point
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }

  getData(sol) {
    fetch(
      "https://api.nasa.gov/insight_weather/?api_key=TFesgKlVUqu2eKmbUpgoH87XHxWJVgzKM110ryQQ&feedtype=json&ver=1.0"
    )
      .then(response => response.json())
      .then(responseJson => {
        var solArray = responseJson.sol_keys;
        var maxDay = sol;
        this.setState({
          sol_selected: sol,
          loading: false,
          marsData: responseJson,
          sols: solArray,
          lastSol: maxDay,
          season: responseJson[maxDay].Season,
          maxT: responseJson[maxDay].AT.mx,
          minT: responseJson[maxDay].AT.mn,
          windS: responseJson[maxDay].HWS.av,
          windD: responseJson[maxDay].WD.most_common.compass_point
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={{
            uri: "https://codehs.com/uploads/1a980faf7cd7fc0d52529644049e2e42"
          }}
        >
          <View style={styles.textContainer}>
            <View style={styles.titleBox}>
              <Text style={styles.welcome}>Welcome to Mars!</Text>
            </View>
            <View style={styles.solBox}>
              <Text style={styles.solWord}>Sol: </Text>
              <Text style={styles.solNumber}>{this.state.lastSol}</Text>
            </View>
            <View style={styles.weatherBox}>
              <Text style={styles.weatherTitle}>
                It is currently {this.state.season}!
              </Text>
              <Text></Text>
              <View style={styles.statsBox}>
                <Text style={styles.weatherTitle}>Max Temp: </Text>
                <Text style={styles.weather}>{this.state.maxT}</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={styles.weatherTitle}>Min Temp: </Text>
                <Text style={styles.weather}>{this.state.minT}</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={styles.weatherTitle}>Winds are out of the </Text>
                <Text style={styles.weather}>{this.state.windD} </Text>
                <Text style={styles.weatherTitle}> at </Text>
                <Text style={styles.weather}> {this.state.windS}</Text>
              </View>
            </View>
            <View style={styles.selectionBox}>
              <View style={styles.marvinBox}>
                <Image
                  source={{
                    uri:
                      "https://codehs.com/uploads/5145f0cf55878327bd72e90b92bcdf59"
                  }}
                  style={styles.marvin}
                />
              </View>
              <View style={styles.pickerBox}>
                <Text style={styles.weatherTitle}>Pick a Sol:</Text>
                <Picker
                  selectedValue={this.state.sol_selected}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    this.getData(itemValue)
                  }
                >
                  {this.state.sols.map((item, index) => {
                    return (
                      <Picker.Item
                        color={"white"}
                        label={item}
                        value={item}
                        key={index}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  background: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: "center",
    alignItems: "center"
  },
  pickerStyle: {
    height: 40,
    width: 100,
    color: "#CCC"
  },
  textContainer: {
    marginTop: deviceHeight / 15,
    marginBottom: deviceHeight / 20
  },
  welcome: {
    fontSize: deviceHeight / 20,
    textAlign: "center",
    color: "#CCC",
    margin: 10
  },
  weather: {
    textAlign: "center",
    fontSize: deviceHeight / 40,
    color: "#CCC",
    marginBottom: 5
  },
  titleBox: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  solBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  solWord: {
    fontSize: deviceHeight / 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#EEE",
    margin: 10
  },
  solNumber: {
    fontSize: deviceHeight / 30,
    textAlign: "center",
    color: "#CCC",
    margin: 10
  },
  weatherTitle: {
    textAlign: "center",
    fontSize: deviceHeight / 40,
    fontWeight: "bold",
    color: "#EEE",
    marginBottom: 5
  },
  weatherBox: {
    justifyContent: "center",
    alignItems: "center",
    flex: 6
  },
  statsBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  selectionBox: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 4,
    flexDirection: "row"
  },
  marvinBox: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2
  },
  marvin: {
    height: (10 * deviceHeight) / 40,
    width: (6 * deviceHeight) / 40
  },
  pickerBox: {
    justifyContent: "center",
    alignItems: "center",
    flex: 3
  }
});
