import React from 'react';
import { Map, TileLayer, GeoJSON, ZoomControl} from 'react-leaflet';

import Legend from './Legend';
import mapOptions from '../data/mapOptions.json';

import helpers from '../utils/SymbologyFunctions';

import '../App.scss'

class LeafletMap extends React.Component {

constructor() {
  super()
  this.state = {
    lat: 37.7,
    lng: -122,
    zoom: 10
  }
}

componentDidUpdate(prevProps, prevState) {
  
  if (prevProps.focusData !== this.props.focusData && this.props.focusData) {

    const data = this.refs.data.leafletElement;
    const focusOptions = mapOptions && mapOptions.find( (option) =>
      (option.column_name === this.props.focusData)
    );

    const type = this.props.focusDataType;

    data.eachLayer(function (layer) {
      var data = layer.feature.properties;
      layer._popup.setContent(
      (type === 'gentrification' ? 

      `<p class="uk-text-muted">CENSUS TRACT</p>
      <span>${data.tractce}</span>` :

      `<p class="uk-text-muted">CENSUS TRACT</p>
      <span>${data.tract}</span>
      <p class="uk-text-muted">ASSOCIATED CITY</p>
      <span>${data._city}</span>
      <p class="uk-text-muted">COUNTY</p>
      <span>${data._county}</span>`) + 

      `<p class="uk-text-muted uk-text-uppercase">${focusOptions.map_name}</p>
      <span>${(data[focusOptions.column_name] === null ? 'N/A' : helpers.symbolize(data[focusOptions.column_name],focusOptions.symbol))}</span>`);
    });
  }
}

render() {
  const position = [this.state.lat, this.state.lng];
  const focusOptions = mapOptions && mapOptions.find( (option) =>
    (option.column_name === this.props.focusData)
  );

  const type = this.props.focusDataType;

  const onEachFeature = function(feature,layer) { 
    layer.bindPopup(
      (type === 'gentrification' ? 

      `<p class="uk-text-muted">CENSUS TRACT</p>
      <span>${feature.properties.tractce}</span>` :

      `<p class="uk-text-muted">CENSUS TRACT</p>
      <span>${feature.properties.tract}</span>
      <p class="uk-text-muted">ASSOCIATED CITY</p>
      <span>${feature.properties._city}</span>
      <p class="uk-text-muted">COUNTY</p>
      <span>${feature.properties._county}</span>`) +
      `<p class="uk-text-muted uk-text-uppercase">${focusOptions.map_name}</p>
      <span>${(feature.properties[focusOptions.column_name] === null ? 'N/A' : helpers.symbolize(feature.properties[focusOptions.column_name],focusOptions.symbol))}</span>`
    );
  }

  const colorFunction = helpers.getColorFunction(focusOptions);

  const mapStyle = function (geoJsonFeature) {
      return {
        fillColor: colorFunction(geoJsonFeature.properties[focusOptions.column_name]),
        weight: 1,
        opacity: 0.65,
        color: "#FFF",
        fillOpacity: 0.9
      } ;
    }

  return (
    <div>
      <Map ref='map' center={position} zoom={this.state.zoom} 
        minZoom={8} maxZoom={14} zoomControl={false} scrollWheelZoom={true} 
        className="map-container">
        <TileLayer 
          className="basemap-layer" url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' />
        <TileLayer 
          className="reference-layer" url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" 
          pane="shadowPane" />  
          {this.props.focusData && 
          (this.props.focusDataType === "gentrification" ?  
            <GeoJSON 
              ref='data' key='gentrification'
              data={this.props.gentrificationData} 
              style={mapStyle} onEachFeature={onEachFeature} /> :
            <GeoJSON 
              ref='data' key='demographic'
              data={this.props.demographicData} 
              style={mapStyle} onEachFeature={onEachFeature} />) }
        <ZoomControl position='topright' />
      </Map>
        <Legend 
          options={focusOptions} />
     
    </div>
    );

  }
}

export default LeafletMap;
