import React from 'react';
import { Map, TileLayer, GeoJSON, ZoomControl} from 'react-leaflet';
import L from 'leaflet';

import Legend from '../components/Legend';
import mapOptions from '../data/mapOptions.json';

import helpers from '../utils/SymbologyFunctions';

import '../App.scss'

const INITIAL_MAP_BOUNDS = L.latLngBounds(
  L.latLng(36.923548,-123.895569),
  L.latLng(38.328730,-120.470581)
);

class DemographicMap extends React.Component {

constructor() {
  super()
  this.state = {
    lat: 37.7,
    lng: -122.6,
    zoom: 9,
    mapData: null
  }
}

/** Load map data from github */
componentDidMount() {

  fetch('https://raw.githubusercontent.com/cci-ucb/baygentrificationdata/master/demographicData.json')
     .then((response) => response.json())
     .then((responseJson) => {
        this.setState({ mapData: responseJson });
     })
     .catch((error) => {
        console.error(error);
     });
}

componentDidUpdate(prevProps, prevState) {
  
  if (prevProps.focusData !== this.props.focusData && this.props.focusData) {

    const data = this.refs.data.leafletElement;
    const focusOptions = mapOptions && mapOptions.find( (option) =>
      (option.column_name === this.props.focusData)
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
      <span>${helpers.symbolize(data[focusOptions.column_name],focusOptions.symbol)}</span>`);
    });
  }
}

render() {
  const position = [this.state.lat, this.state.lng];
  const focusOptions = mapOptions && mapOptions.find( (option) =>
    (option.column_name === this.props.focusData)
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
      <span>${helpers.symbolize(feature.properties[focusOptions.column_name], focusOptions.symbol)}</span>`
    );
  }

  const colorFunction = helpers.getColorFunction(focusOptions);

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
    
    !this.state.mapData ? 
    <div className="uk-position-center">
      <span uk-spinner="ratio: 2" />
      <p>Loading...</p>
    </div> :
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
          {this.props.focusData &&
          <GeoJSON 
            ref='data' 
            data={this.state.mapData} 
            style={mapStyle} 
            onEachFeature={onEachFeature} /> }
        <ZoomControl position='topright' />
      </Map>
        <Legend 
          options={focusOptions} />
     
    </div>
    );

  }
}

export default DemographicMap;
