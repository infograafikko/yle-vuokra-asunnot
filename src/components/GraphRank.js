import React, { Component } from 'react';
import _ from 'lodash';
import {ResponsiveXYFrame} from 'semiotic';
import { AnnotationCallout } from 'react-annotation';


export default class GraphRank extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataRank: []
        };      
    }

    componentWillReceiveProps(nextProps){

        const rankData = nextProps.dataRank;

        this.rankFunction(rankData, "avgBuildYear", "yearRank")
        this.rankFunction(rankData, "avgprice", "priceRank")
        this.rankFunction(rankData, "avgsize", "sizeRank")

        rankData.map(d => {
            d.coordinates = [
                    //Count value based on value vs. max
                    {title: 'Keskimääräinen hinta', point: 1, rank: d.priceRank},
                    {title: 'Keskimääräinen rakennusvuosi', point: 2, rank: d.yearRank},
                    {title: 'Keskimääräinen koko', point: 3, rank: d.sizeRank}
                ]
        })       
        this.setState({dataRank: rankData})
    }

    rankFunction(data, avgitem, rankname){

         //Rank from highest to lowest
         _(_.sortBy(data, avgitem)).reverse().forEach(function(row,rank) {
            var currentMunicipality = row.municipality;
            var pushToData = _.find(data, item => { return item.municipality === currentMunicipality})
            pushToData[rankname] = rank + 1;
       })    
    }

    render() {

        if(!this.state.dataRank)
            return
        else

        return (
        <div style={{marginTop: 20}}>
            <p>Selittääkö hintojen suuruutta se, että Helsingissä on uudempia ja suurempia rakennuksia? Tilastot eivät tue tällaista näkemystä. Helsingissä vuokra-asuntojen keskihinta on koko joukon korkein ja asuntokanta kaikkein vanhinta. Asuntojen kokojen vertailussa Helsinki sijoittuu keskijoukkoon.</p>
            <h3>Vuokra-asuntokanta kunnittain sijoituksen mukaan</h3>
            <ResponsiveXYFrame
                size={[350,300]}
                className='rank'
                lines={this.state.dataRank}
                lineType= {{ type: "line" }}
                xAccessor={"point"}
                yAccessor={"rank"}
                invertY={true}
                xExtent={[0.7,3.2]}
                lineStyle={d => d.municipality !== "Helsinki" ? ({stroke: "lightgray", strokeOpacity: 0.5, strokeWidth: 5}) : ({stroke: "#4BB2C5", strokeOpacity: 0.5, strokeWidth: 5})}
                axes={[{ orient: "left", label: "Sijoitus"}]}
                margin={{ top: 30, bottom: 30, left: 70, right: 50 }}
                annotations={
                    [
                    { type: AnnotationCallout, color: "lightgray", point: 3, rank: 1,  dx: 10, dy: -10, note: { title: "Vantaa" }, connector: {end: 'dot'}},
                    { type: AnnotationCallout, color: "lightgray", point: 3, rank: 2,  dx: 10, dy: -10, note: { title: "Kuopio" }, connector: {end: 'dot'}},
                    { type: AnnotationCallout, color: "lightgray", point: 3, rank: 3,  dx: 10, dy: -10, note: { title: "Espoo" }, connector: {end: 'dot'}},
                    { type: AnnotationCallout, color: "lightgray", point: 3, rank: 4,  dx: 10, dy: -10, note: { title: "Turku" }, connector: {end: 'dot'}},
                    { type: AnnotationCallout, color: "lightgray", point: 3, rank: 5,  dx: 10, dy: -10, note: { title: "Jyväskylä" }, connector: {end: 'dot'}},
                    { type: AnnotationCallout, color: "#4BB2C5", point: 3, rank: 6,  dx: 10, dy: -10, note: { title: "Helsinki" }, connector: {end: 'dot'}},
                    { type: AnnotationCallout, color: "lightgray", point: 3, rank: 7,  dx: 10, dy: -10, note: { title: "Tampere" }, connector: {end: 'dot'}},
                    { type: AnnotationCallout, color: "lightgray", point: 3, rank: 8,  dx: 10, dy: -10, note: { title: "Lahti" }, connector: {end: 'dot'}},
                    { type: AnnotationCallout, color: "lightgray", point: 3, rank: 9,  dx: 10, dy: -10, note: { title: "Oulu" }, connector: {end: 'dot'}},
                ]}
                foregroundGraphics={
                    <g>
                    <g>
                    <text textAnchor="middle" y={290} x={100}>Hinta</text>
                    <text y={300} x={100} style={{ textAnchor:"middle", fill:"gray", fontSize:10 }}>(ka.)</text>
                    </g>
                    <g>
                    <text textAnchor="middle" y={290} x={187}>Rakennusvuosi</text>
                    <text y={300} x={187} style={{ textAnchor:"middle", fill:"gray", fontSize:10 }}>(ka.)</text>
                    </g>
                    <g>
                    <text textAnchor="middle" y={290} x={280}>Koko</text>
                    <text y={300} x={280} style={{ textAnchor:"middle", fill:"gray", fontSize:10 }}>(ka.)</text>
                    </g>
                    </g>
                }
                />
                <p style={{marginTop: 20}} >Oheisessa grafiikassa kaupungit on järjestetty hintojen, rakennusvuoden ja vuokra-asunnon koon mukaan järjestykseen. Se kunta, jossa luku on korkein, saa sijoituksen 1. Kun luku on toiseksi korkein, se saa sijoituksen 2 ja niin edelleen.</p>
                <p>Grafiikka näyttää sen, että Helsinki poikkeaa profiililtaan muista pääkaupunkiseudun kunnista. Vantaalla ja Espoossa rakennuskanta on joukon uusinta ja asunnot suurempia. Tätä saattaa selittää se, että keskustassa rakennuskanta on tyypillisesti vanhaa ja asunnot pieniä. Hyvästä sijainnista johtuen asunnot ovat kuitenkin kalliita.</p>
        </div>
        )
    }
}