import React from 'react';
import LeafletMap from './components/LeafletMap';

import mapOptions from './data/mapOptions.json';

import './App.scss'

const GENT_LAYER_NAMES = ['udp_2015_1','bayarea_commercialtracts_comdist_c_','commercial_gent_status'];

class App extends React.Component {

constructor() {
    super()
    this.state = {
      focusData: 'udp_2015_1',
      gentrificationData: null,
      demographicData: null
    }
  }

    /** Load map data from github */
  componentDidMount() {

    fetch('https://raw.githubusercontent.com/cci-ucb/baygentrificationdata/master/gentrificationData.json')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({ gentrificationData: responseJson });
          fetch('https://raw.githubusercontent.com/cci-ucb/baygentrificationdata/master/demographicData.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ demographicData: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
      })
      .catch((error) => {
          console.error(error);
      });
  }

  render() {

    return (
      !this.state.gentrificationData || !this.state.demographicData ? 
      <div className="uk-position-center">
        <span uk-spinner="ratio: 2" />
        <p>Loading...</p>
      </div> :
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
          <LeafletMap 
            gentrificationData={this.state.gentrificationData}
            demographicData={this.state.demographicData}
            focusData={this.state.focusData} 
            focusDataType={(GENT_LAYER_NAMES.includes(this.state.focusData)) ? "gentrification" : "demographic"} />
      </div>);
  }
}

export default App;
