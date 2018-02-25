import React, { Component } from 'react';
import {ResponsiveOrdinalFrame} from 'semiotic';

const colors = ['#4BB2C5', '#673BB8', '#CB1C4E', '#D7920C', '#1AB283', '#C93496']

export default class GraphJoy extends Component {

  
    constructor(props) {
        super(props);
        this.state = {
            helsinkiOverThousand: 0
        };      
    }
  

    componentWillReceiveProps(nextProps){
        const helsinkiOverThousand = nextProps.data.filter(d => d.municipality === "Helsinki" & d.rent >= 1000)
        this.setState({ helsinkiOverThousand: helsinkiOverThousand})
    }

    componentDidUpdate() {

    }

    render() {

        
        return (
        <div>
            <p>Ylen selvityksessä tutkittiin vuokra-asuntojen hintoja ympäri Suomen. Aineisto kattaa noin {this.props.datapoints} vuokra-asuntoa ympäri Suomea.</p>
            <p>Aineistossa tarkastellaan vain suurimpia kaupunkeja, sillä niistä oli saatavilla eniten vuokrattavia kohteita. Tarkastellaan seuraavaksi keskiarvoa tarkemmin vuokra-asuntojen hintoja. Graafista on jätetty pois yli 3 000 euron kuukausivuokran asunnot.</p> 
            <h3>Vuokra-asuntojen määrä ja kuukausivuokra</h3>
            <ResponsiveOrdinalFrame
            size={[500,500]}
            responsiveWidth={true}
            responsiveHeight={false}
            data={this.props.data}
            projection="horizontal"
            oAccessor={"municipality"}
            oLabel={d => 
                <g>
                <text textAnchor="end" y={0} x={-30}>{d}</text>
                <text  y={15} x={-30} style={{ textAnchor:"end", fill:"gray", fontSize:10 }}>{this.props.datalength[d]}</text>
                </g>}
            rAccessor={"rent"}
            summaryType={{type: "joy", amplitude: 40}}
            summaryStyle={(d,i) => ({fill: colors[i%colors.length], stroke: "gray", opacity: 0.5})}
            axis={{orient: "bottom", tickValues: [200,600,1000, 1500, 2000, 3000]}}
            margin={{top: 50, bottom: 50, left: 120, right: 50}}
            lineIDAccessor={"municipality"}
            annotations={[{ type: "react-annotation", rent: 600, municipality: "Oulu", label: "Oulussa suuri määrä n. 600 €/kk vuokra-asuntoja", color: "gray", dy: -1, dx: window.innerWidth*0.35}]}
            foregroundGraphics={
                <g>
                <g className="labeling">
                <text className="kunta" textAnchor="end" y={25} x={88}>Kunta</text>
                <text className="lkm" y={40} x={88} style={{ textAnchor:"end", fill:"gray", fontSize:10 }}>Kohteet (lkm)</text>
                </g>
                <g className="x-axis labeling">
                <text className="kuukausivuokra" x={window.innerWidth*0.55} y={493} style={{ textAnchor: 'middle', fill:'gray'}}>Kuukausivuokra (€)</text>
                </g>
                </g>
            }
            />
            <p style={{marginTop: 20}}>Graafi kuvastaa vuokra-asuntokohteiden hintojen jakaumaa ja vuokra-asuntojen määrää. Mitä korkeammalle kuvaaja yltää, sitä enemmän on tarjontaa kyseisessä hintaluokassa. Esimerkiksi  Oulussa on tarjolla runsaasti 600 euron asuntoja. Puolestaan Kuopiossa tarjonta on vähäisempää, mutta asuntojen keskihinta on hieman kalliimpi.</p>
            <p>Ainoastaan pääkaupunkiseudulla vuokra-asunnosta joutuu maksamaan usein jopa yli 1 000 euroa kuukaudessa. Vaikka tarjonta on Helsingissä laajinta 812 vuokra-asunnolla, hintataso on korkealla. Helsingissä {this.state.helsinkiOverThousand.length} asuntoa kustantaa yli 1 000 euroa kuukaudessa.</p>
        </div>
        )
    }
}