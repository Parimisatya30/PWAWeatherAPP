<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-left wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Search" text="Search for forecast data">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md3>
                  <v-text-field label="City" v-model="searchCity" />
                </v-flex>
                <v-flex xs12 md6></v-flex>
                <v-flex xs12 md3 justify-right>
                  <v-select
                    v-model="searchCity"
                    :items="favouriteCities"
                    label="Select a favorite city"
                  ></v-select>
                </v-flex>
                  <v-flex xs12 md2>
                  <v-btn
                    class="mx-0 font-weight-light"
                    @click="onSearchClick()"
                    color="success"
                  >Find Forecast</v-btn>
                </v-flex>
                  <v-flex xs12 md2>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="onCurrentLocation()"
                  >Current City</v-btn>
                </v-flex>
                  <v-flex xs12 md2>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                      @click="onSaveClick()"
                  >Save Search</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex md12>
        <material-card
          color="green"
          flat
          full-width
          title="Daily Weather Forecast"
          text="Shows forecast data with temp, humidity etc."
        >
          <v-data-table :headers="headers" :items="dailyForeCast.list" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text" />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.dt }}</td>
              <td>{{ displayTemp (item.temp) }} c</td>
              <td>{{ item.weather[0].main }}</td>
              <td>{{ item.humidity }}</td>
              <td>{{ item.pressure }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex md12>
        <material-card
          color="green"
          flat
          full-width
          title="Hourly Weather Forecast"
          text="Shows forecast data with temp, humidity etc."
        >
          <v-data-table :headers="headers" :items="hourlyForeCast.list" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text" />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ timestampToHour (item.dt) }}</td>
              <td>{{ displayTemp(item.main.temp) }} c</td>
              <td>{{ item.weather[0].main }}</td>
              <td>{{ item.main.humidity }}</td>
              <td>{{ item.main.pressure }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import firebase from "../../configFirebase.js";

export default {
  data() {
    return {
      headers: [
        {
          sortable: false,
          text: "Date",
          value: "date"
        },
        {
          sortable: false,
          text: "Temp",
          value: "temp"
        },
        {
          sortable: false,
          text: "Weather",
          value: "weather"
        },
        {
          sortable: false,
          text: "Humidity",
          value: "humidity"
        },
        {
          sortable: false,
          text: "Pressure",
          value: "pressure"
        }
      ],
      hourlyForeCast: {},
      dailyForeCast: {},
      favouriteCities: [],
      searchCity: "",
       gettingLocation: false,
    };
  },
 created: function() {
    this.fetchFavouriteCities();
  },
mounted() {
    let geo1Script = document.createElement("script");
    geo1Script.setAttribute(
      "src",
      "https://js.api.here.com/v3/3.0/mapsjs-core.js"
    );
    document.head.appendChild(geo1Script);
    let geo2Script = document.createElement("script");
    geo2Script.setAttribute(
      "src",
      "https://js.api.here.com/v3/3.0/mapsjs-service.js"
    );
    document.head.appendChild(geo2Script);
  },
 methods: {
 onSearchClick() {
      this.fetchWeatherData("hourly");
      this.fetchWeatherData("daily");
    },
  
fetchWeatherData(endPointType) {
  
        var url =
          "https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast/" +
          endPointType +
          "?q=" +
          this.searchCity +
          "&appid=b6907d289e10d714a6e88b30761fae22";
        axios.defaults.withCredentials = false;  
        axios.get(url).then(response => {
          if (endPointType == "hourly") this.hourlyForeCast = response.data;
          else if (endPointType == "daily") this.dailyForeCast = response.data;

        
        });
   
    },
     async  getLocation() {
      
      return new Promise((resolve, reject) => {

        if(!("geolocation" in navigator)) {
          reject(new Error('Geolocation is not available.'));
        }

        navigator.geolocation.getCurrentPosition(pos => {
          resolve(pos);
        }, err => {
          reject(err);
        });

      });
    },
  async onCurrentLocation11() {

      this.gettingLocation = true;
    //   try {
        this.gettingLocation = false;
        // var xyz=await this.getLocation()
        // this.searchCity =  xyz;
//         var myLat =xyz;
//         axios('https://maps.googleapis.com/maps/api/geocode/json?address=' + myLat + ',' + myLon + '&key=' + myApiKey)
//         .then((response) => response.json())
//         .then((responseJson) => {
//             console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
// })
     
//       } catch(e) {
//         this.gettingLocation = false;
       
//       }
      
    },
    
  
onCurrentLocation() {
     

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
  
//          var myApiKey =
//     "lrA7HHg3IwOzGvbXWr4K";
          
//  axios('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.longitude + ','
//   + position.coords.latitude + '&key=' + myApiKey)
//         .then((response) => response.json())
//         .then((responseJson) => {
//             console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
// })
        

          var platform = new H.service.Platform({
            app_id: "lrA7HHg3IwOzGvbXWr4K",
            app_code: "Qn0AIgmz2r6-QKTFnPUF4w"
          });
          var geocoder = platform.getGeocodingService();
          geocoder.reverseGeocode(
            {
              mode: "retrieveAddresses",
              maxresults: 1,
              prox: position.coords.latitude + "," + position.coords.longitude
            },
            data => {
              this.searchCity =
                data.Response.View[0].Result[0].Location.Address.City;
            },
            error => {
              alert(error);
            }
          );
        });
      
      } 
   
    },
  
   onSaveClick() {
      firebase.db.collection("fav-cities").add({
        CityName: this.searchCity
      });
    },
     fetchFavouriteCities() {
      firebase.db
        .collection("fav-cities")
        .orderBy("CityName", "desc")
        .onSnapshot(snapShot => {
          this.favouriteCities = [];
          snapShot.forEach(city => {
            this.favouriteCities.push(city.data().CityName);
          });
        });
    },

      // formatting methods
    displayTemp: function(temp) {
      return parseFloat(temp - 273.15).toFixed(2);
    },
    timestampToHour: function(timestamp) {
      var date = new Date(timestamp * 1000);
      return date.toLocaleString("en-US");
    },
    timestampToDate: function(timestamp) {
      var date = new Date(timestamp * 1000);
      return date.toLocaleDateString("en-US").slice(0, 4);
    }
 }
  };
</script>


