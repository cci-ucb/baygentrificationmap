import React from 'react';
import { Map, TileLayer, GeoJSON, ZoomControl} from 'react-leaflet';
import L from 'leaflet';

import Legend from './components/Legend';
import demographicData from './data/demographicData.json';
import mapOptions from './data/mapOptions.json';

import './App.scss'

const INITIAL_MAP_BOUNDS = L.latLngBounds(
  L.latLng(36.923548,-123.895569),
  L.latLng(38.328730,-120.470581)
);

const getColorFunction = function(options) {
  if (options.legend_style === "standard") {
    return (d) => (
      d < options.breaks[0] ? options.colors[0] :
      d < options.breaks[1] ? options.colors[1] :
      d < options.breaks[2] ? options.colors[2] :
      d < options.breaks[3] ? options.colors[3] :
      d >= options.breaks[3] ? options.colors[4] :
      '#CCCCCC');
  }
  else if (options.legend_style === "classes") {
    return (d) => (
      d === options.breaks[0] ? options.colors[0] :
      d === options.breaks[1] ? options.colors[1] :
      '#CCCCCC');
  }
}

class App extends React.Component {

constructor() {
  super()
  this.state = {
    loaded: false,
    lat: 37.7,
    lng: -122.6,
    zoom: 9,
    mapData: demographicData,
    focusData: 'gc_gent13',
    p: false
  }
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.focusData !== this.state.focusData) {
    const data = this.refs.data.leafletElement;
    const focusOptions = mapOptions && mapOptions.find( (option) =>
      (option.column_name === this.state.focusData)
    );

    data.eachLayer(function (layer) {
      var data = layer.feature.properties;
      layer._popup.setContent(
      `<p class="uk-text-muted">CENSUS TRACT</p>
      <span>${data.tract}</span>
      <p class="uk-text-muted">ASSOCIATED CITY</p>
      <span>${data._city}</span>
      <p class="uk-text-muted">COUNTY</p>
      <span>${data._county}</span>
      <p class="uk-text-muted uk-text-uppercase">${focusOptions.map_name}</p>
      <span>${data[focusOptions.column_name]}</span>`);
    });
  }
}

render() {
  const position = [this.state.lat, this.state.lng];
  const focusOptions = mapOptions && mapOptions.find( (option) =>
    (option.column_name === this.state.focusData)
  );

  const onEachFeature = function(feature,layer) { 
    layer.bindPopup(
      `<p class="uk-text-muted">CENSUS TRACT</p>
      <span>${feature.properties.tract}</span>
      <p class="uk-text-muted">ASSOCIATED CITY</p>
      <span>${feature.properties._city}</span>
      <p class="uk-text-muted">COUNTY</p>
      <span>${feature.properties._county}</span>
      <p class="uk-text-muted uk-text-uppercase">${focusOptions.map_name}</p>
      <span>${feature.properties[focusOptions.column_name]}</span>`
    );
  }

  const colorFunction = getColorFunction(focusOptions);

  const mapStyle = function (geoJsonFeature) {
      return {
        fillColor: colorFunction(geoJsonFeature.properties[focusOptions.column_name]),
        weight: 1,
        opacity: 1,
        color: "#FFF",
        fillOpacity: 0.9
      } ;
    }

  return (
    
    // !this.state.loaded ? 
    // <div className="uk-position-center">
    //   <span uk-spinner="ratio: 2" />
    //   <p>Loading...</p>
    // </div> :
    <div>
      <Map ref='map' center={position} zoom={this.state.zoom} zoomControl={false} scrollWheelZoom={true} className="map-container">
        <TileLayer 
          className="basemap-layer"
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' />
        <TileLayer 
          className="reference-layer"
          url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" 
          pane="shadowPane" />        
        <GeoJSON 
          ref='data' 
          data={this.state.mapData} 
          style={mapStyle} 
          onEachFeature={onEachFeature} />
        <ZoomControl position='topleft' />
      </Map>
      <div className="overlay-container">
        <button className="uk-button uk-button-default policy-selector" type="button">Map a data series... </button>
        <div uk-dropdown="pos: bottom-right; mode: click">
          <div className="uk-height-medium uk-overflow-auto">
            <ul className="uk-nav uk-dropdown-nav">
              {mapOptions.map( (dataset, i) => 
                <li key={i}>
                  <a href='#' 
                     className={(this.state.focusData === dataset.column_name ? "active" : "")}
                     onClick={() => this.setState({focusData: dataset.column_name})}>
                       {dataset.map_name}
                  </a>
                </li> )}
            </ul>
          </div>
        </div>
        <Legend 
          options={focusOptions} />
      </div>
    </div>
    );

  }
}

export default App;
