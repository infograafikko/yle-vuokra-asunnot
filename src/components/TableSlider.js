import React, { Component } from 'react';
import Slider from 'react-rangeslider'
import { Table, Accordion, Icon } from 'semantic-ui-react'



export default class TableSlider extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            userRent: 1000,
            activeIndex: 1
        };
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
      }

    handleSliderChange(sliderValue) {

        const avgDataUpdate = this.props.averageData; 
        avgDataUpdate.map(d => {
            d.squaresformoney = sliderValue / d.avgpricepersquare
        })
        this.setState({ userRent: sliderValue, averages: avgDataUpdate})

    }

    componentWillReceiveProps(nextProps){
        this.setState({ averages: nextProps.averageData})
    }

    render() {
        const sliderValue = this.state.userRent;
        const { activeIndex } = this.state;


        //If averages haven't loaded yet
        if(!this.state.averages)
            return (
            <div></div>
            )
        else

        return (
        <div>
            <h2>Maksat vuokraa: {this.state.userRent} €</h2>
            <Slider
                value={sliderValue}
                min={100}
                max={2000}
                step={50}
                onChange={this.handleSliderChange.bind(this)}
            />
            <h3>Tällä rahalla saat vuokraneliöitä:</h3>
            <Table unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Kaupunki</Table.HeaderCell>
                        <Table.HeaderCell>Vuokraneliöt (m²)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                {this.state.averages.map((d,i) => 
                    <Table.Row key={i}>
                        <Table.Cell>{d.municipality}</Table.Cell>
                        <Table.Cell>{d.squaresformoney.toFixed(0)}</Table.Cell> 
                    </Table.Row>
                    )} 
                </Table.Body>
            </Table>
            <Accordion style={{marginBottom: 20}} styled>
                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    Lue lisää laskentatavasta
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <p>
                    Vuokraneliöiden määrä on laskettu keskineliöhinnasta kunkin kaupungin vuokra-asunnoista Vuokraovi.fi-palvelussa. Luku on suuntaa-antava keskiarvo.
                    </p>
                </Accordion.Content>
            </Accordion>
        </div>
        )
    }
}