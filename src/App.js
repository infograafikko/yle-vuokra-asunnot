import React, { Component } from 'react';

import data from './data/data.json';
import _ from 'lodash';

import Lead from './components/Lead.js'
import TableSlider from './components/TableSlider.js'
import GraphJoy from './components/GraphJoy.js'
import GraphRank from './components/GraphRank.js'
import GraphAverages from './components/GraphAverages.js'


import 'semantic-ui-css/semantic.min.css'
import './styles/react-rangeslider.css'
import './styles/semiotic.css'



const municipalities = ["Helsinki", "Espoo", "Vantaa", "Jyväskylä", "Tampere", "Lahti", "Kuopio", "Turku",  "Oulu"]

//Filter keys from original dataset
let subset = data.map(d => _.pick(d, ['size', 'rent', 'municipality', 'building', 'build_year']))

//Filter out over 3000 e appartments
subset = subset.filter(d => d.rent <= 3000)

//includes selected municipalities
subset = _.filter(subset, ({municipality}) => _.every([
  _.includes(municipalities, municipality)
])
)

//Count rent price per square
subset.map(d => {
  return d.pricepersquare = d.rent / d.size
})

//Sort data in the same order as const municipalities
subset = _.sortBy(subset, (obj) => 
  _.indexOf(municipalities, obj.municipality)
)


export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userRent: 1000,
      data: []
    };
    this.saveToState = this.saveToState.bind(this);

  }

  componentDidMount() {

    //We want have avg pricepersquare for every city
    const avgData = []
    
    //Loop through municipalities list
    municipalities.forEach((selectedMunic) => {
        const averages = []
        subset.filter(d => d.municipality === selectedMunic).forEach(key => 
          //Push pricepersquare values to a single array 
          averages.push({pricepersquare: key.pricepersquare, price: key.rent, size: key.size, year: key.build_year})
        )
        const meanPricePerSquare = _.meanBy(averages,'pricepersquare');
        const meanPrice = _.meanBy(averages,'price');
        const meanSize = _.meanBy(averages,'size');
        const meanBuildYear = _.meanBy(averages,'year');

        avgData.push({ municipality: selectedMunic, avgpricepersquare: meanPricePerSquare, avgsize: meanSize, avgprice: meanPrice, avgBuildYear: meanBuildYear})

    });

    this.saveToState(subset, avgData);
  
  }

  saveToState(subset,avgData){
    //Count how many squares you get for the selected amount of money
    avgData.map(d => {
      return d.squaresformoney = this.state.userRent / d.avgpricepersquare
    })

    //Count how many apartments in each municipality
    const dataLength = _.countBy(subset.map(d => d.municipality))

    //Count Espoo apartments
    const dataIsotype = subset.filter(d => d.municipality === "Tampere" & d.rent >= 300 & d.rent <= 2000)

    this.setState({
      data: subset,
      averages: avgData,
      datapoints: subset.length,
      datalength: dataLength,
      dataIsotype: dataIsotype
    })

  }

  render() {
    const data = this.state.data
    const dataIso = this.state.dataIsotype

    return (
      <div>
        <Lead />
        <TableSlider averageData={this.state.averages} />
        <GraphJoy data={data} datalength={this.state.datalength} datapoints={_.round(this.state.datapoints, -2)} />
        <GraphRank dataRank={this.state.averages} />
        <GraphAverages dataAvg={this.state.averages}/>
      </div>
    );
  }
}
