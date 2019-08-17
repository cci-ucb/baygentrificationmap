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

const getColorTotal = function(d) {
  return d < 1 ? '#FAEFDA' :
         d < 3 ? '#F4E0BB' :
         d < 6 ? '#FCD07E' :
         d < 10 ? '#F4B030' :
         '#e49d1b';
};

const getColor = function(d) {
  return !d || d.slice(0,2).toUpperCase() === 'NO' ? '#E2DDCF' : 
  '#F9BB56';
}


class App extends React.Component {

constructor() {
  super()
  this.state = {
    lat: 37.7,
    lng: -122.6,
    zoom: 9,
    mapData: demographicData,
    focusData: 'rsk_pop',
  }
}

// updateStyle = (focusData) => {

//   this.setState({
//     focusData: focusfocusDataPolicy,
//     style: function (geoJsonFeature) {
//       return {
//         fillColor: (focusPolicy === "total" ? getColorTotal(geoJsonFeature.properties.total) : getColor(geoJsonFeature.properties[focusPolicy])),
//         weight: (geoJsonFeature.properties.city === focusCity ? 2 : 1),
//         opacity: (geoJsonFeature.properties.city === focusCity ? 1 : 0.5),
//         color: (geoJsonFeature.properties.city === focusCity ? "#000" : "#FFF"),
//         fillOpacity: 0.9
//       } ;
//     }
//   });

// }

render() {
  const position = [this.state.lat, this.state.lng];
  const focusOptions = mapOptions && mapOptions.find( (option) =>
    (option.column_name === this.state.focusData)
  );

  return (
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
          style={this.state.style} />
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
                     onClick={() => this.updateStyle(dataset.map_name)}>
                       {dataset.map_name}
                  </a>
                </li> )}
            </ul>
          </div>
        </div>
        {/* <Legend 
          policy={(focusPolicyObject && focusPolicyObject.name ? focusPolicyObject.name : "Count of anti-displacement policies")} /> */}
      </div>
    </div>
    );

  }
}

export default App;
