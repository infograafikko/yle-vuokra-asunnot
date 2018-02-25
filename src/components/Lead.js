import React, { Component } from 'react';
import headerimage from '../img/kerrostalo-small.jpg'


export default class Lead extends Component {
    render() {
        return (
        <div>
            <h1>Helsinkiläinen maksaa vuokraneliöistään yli 1 000 euroa - katso montako neliötä saat samalla rahalla muualta</h1>
            <img src={headerimage} alt="kerrostalo" />
            <h4 style={{marginBottom: 20}}>Asuntojen hinnat ovat kalliimmat pääkaupunkiseudulla kuin muualla Suomessa. Etenkin Helsingissä vuokrahinnat ovat erityisen korkeat.</h4> 
        </div>
        )
    }
}