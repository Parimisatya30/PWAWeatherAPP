<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-left wrap>
      <v-flex xs12 md8>
        
           <v-card-title color="green"> 
    Search for forecast data
    <v-spacer></v-spacer>     
  </v-card-title>
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
   
      </v-flex>
      <v-flex md12>
           <v-card-title color="green"> 
    Daily Weather Forecast
    <v-spacer></v-spacer>     
  </v-card-title>       
          <v-data-table :headers="headers" :items="dailyForeCast" hide-default-footer>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text" />
            </template>         
          </v-data-table>     
      </v-flex>
      <v-flex md12>
              <v-card-title color="green"> 
    Hourly Weather Forecast
    <v-spacer></v-spacer>     
  </v-card-title>       
          <v-data-table :headers="headersHourly" :items="hourlyForeCast" hide-default-footer >
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text" />
            </template>         
          </v-data-table>         
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
      headersHourly: [
     
        {
          sortable: false,
          text: "hourlytime",
          value: "hourlytime"
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
      hourlyForeCast: [],
      dailyForeCast: [],
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
          if (endPointType == "hourly") 
          {
            this.hourlyForeCast=[];
        
          response.data.list.forEach(x => {
                            var model = {
                               hourlytime: new Date(x.dt * 1000).toLocaleString("en-US"),                                              
                                temp: parseFloat(x.main.temp - 273.15).toFixed(2) + ' c', 
                                weather: x.weather[0].main,
                                humidity: x.main.humidity,
                                pressure: x.main.pressure
                            }
                            this.hourlyForeCast.push(model);
                             
                        });                     
          }
          else if (endPointType == "daily") 
          {            
this.dailyForeCast=[];
             response.data.list.forEach(x => {
                            var model = {
                                date: new Date(x.dt * 1000).toLocaleDateString("en-US").slice(0, 9),
                                temp: parseFloat(x.temp.day - 273.15).toFixed(2) + ' c',
                                weather: x.weather[0].main,
                                humidity: x.humidity,
                                pressure: x.pressure
                            }
                            this.dailyForeCast.push(model);
                        });

          }        
        });
   
    },    
  
onCurrentLocation() {     

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {  


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

    
 }
  };
</script>


