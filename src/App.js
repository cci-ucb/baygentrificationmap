import React from 'react';
import DemographicMap from './components/DemographicMap';
import GentrificationMap from './components/GentrificationMap';

import mapOptions from './data/mapOptions.json';

import './App.scss'

const GENT_LAYER_NAMES = ['udp_2015_1','bayarea_commercialtracts_comdist_c','status'];

class App extends React.Component {

constructor() {
    super()
    this.state = {
      focusData: 'gc_gent13'
    }
  }

  render() {

    return (
      <div>
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
        </div>
        {!this.state.focusData || !GENT_LAYER_NAMES.includes(this.state.focusData) ? 
          <DemographicMap focusData={this.state.focusData} /> :
        this.state.focusData && GENT_LAYER_NAMES.includes(this.state.focusData) ?
          <GentrificationMap focusData={this.state.focusData} /> :
        <div />}
      </div>);
  }
}

export default App;
