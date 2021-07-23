import React from "react";
import "./App.css";

import SearchBar from "./Components/searchBar";
import CurrentWeather from "./Components/current-weather";
import Forecast from "./Components/forecast";

import * as Api from "./API/open-weather.api";

const FARENHEIT = "farehnheit";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      metric: FARENHEIT,
      hourlyForecast: [],
      current: "",
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.updateTemperature = this.updateTemperature.bind(this);

    this.updateTemperature();
  }

  handleLocationChange(location) {
    this.setState({ location });
  }

  async updateTemperature() {
    const weatherRes = await Api.getWeatherBasedOnLocation(this.state.location);
    const forecastRes = await Api.getForecast(
      weatherRes.coord.lat,
      weatherRes.coord.lon
    );

    this.setState({
      current: forecastRes.current,
      metric: FARENHEIT,
      hourlyForecast: forecastRes.hourly,
    });
  }

  render() {
    const location = this.state.location;
    const hourlyForecast = this.state.hourlyForecast;
    const current = this.state.current;

    return (
      <div className="App">
        <header className="App-header">
          <SearchBar
            searchValue={location}
            onSearchChange={this.handleLocationChange}
            onFormSubmit={this.updateTemperature}
          />

          {current && <CurrentWeather current={current} />}
          {hourlyForecast.length > 0 && <Forecast forecast={hourlyForecast} />}
        </header>
      </div>
    );
  }
}

export default App;
