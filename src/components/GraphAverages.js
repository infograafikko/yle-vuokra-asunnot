import React, { Component } from 'react';
import {ResponsiveOrdinalFrame} from 'semiotic';
import {Button} from 'semantic-ui-react'


const colors = ['#4BB2C5', '#673BB8', '#CB1C4E', '#D7920C', '#1AB283', '#C93496']
const accessors = ['avgsize', 'avgprice', 'avgBuildYear']
const starts = [0,0,1850]
const type = ["bar","bar","point"]


  //Municipality, percent, type, color

export default class GraphIsotypeHorizontal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            play: [true,false,false],
            accessor: "avgsize",
            type: "bar",
            startExtent: 0
        };
    }

    handleStates = (e) => {

        const currentIndex = e.currentTarget.getAttribute('data-key')

        let play = [false,false,false];
        play[currentIndex] = true;

        this.setState({
            play: play, 
            accessor: accessors[currentIndex], 
            startExtent: starts[currentIndex],
            type: type[currentIndex],
        })

    }

    render() {

        return (
        <div style={{marginTop: 20}}>
            <h3 style={{marginTop: 20}}>Vuokra-asuntojen keskimääräinen koko, hinta ja rakennusvuosi</h3>
            <ResponsiveOrdinalFrame
                size={[500,300]}
                responsiveWidth={true}
                responsiveHeight={false}
                data={this.props.dataAvg}
                type={this.state.type}
                projection="horizontal"
                oAccessor={"municipality"}
                rAccessor={this.state.accessor}
                rExtent={[this.state.startExtent,undefined]}
                style={d => ({ fill: colors[0]})}
                oLabel={{ orient: "left" }}
                oPadding={5}
                axis={{
                  orient: "top",
                }}
                margin={{ top: 30, bottom: 0, left: 80, right: 10 }}
            />
            <Button className={this.state.play[0] ? 'ui button teal' : 'ui button'} style={{marginLeft: 80, marginTop: 10}} onClick={this.handleStates} data-key="0">Koko</Button>
            <Button className={this.state.play[1] ? 'ui button teal' : 'ui button'} onClick={this.handleStates}  data-key="1">Hinta</Button>
            <Button className={this.state.play[2] ? 'ui button teal' : 'ui button'} onClick={this.handleStates}  data-key="2">Rakennusvuosi</Button>
            <p style={{ marginTop: 20}}>Vielä lopuksi voit tarkastella vuokra-asuntojen keskimääräistä kokoa, hintaa ja rakennusvuotta kaupungeittain. Tämä antaa käyttäjälle mahdollisuuden löytää itse datasta kiinnostavia asioita.</p>


        </div>
        )
    }
}