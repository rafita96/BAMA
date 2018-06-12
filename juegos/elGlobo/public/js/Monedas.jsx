class Moneda extends React.Component{

    render(){
        return(
            <g>
                <ellipse cx={this.props.cx} cy={this.props.cy} 
                        rx="10" ry="20" 
                        fill="#F5F500"
                        stroke="black" />
                <ellipse cx={this.props.cx} cy={this.props.cy} 
                        rx="8" ry="18" 
                        fill="#FFFF0A"
                        stroke="black" />
                <text x={this.props.cx-2} y={this.props.cy+2} font-family="Verdana" font-size="10" fill="black">$</text>
            </g>
        );
    }
}

class Monedas extends React.Component{

    render(){
        let monedas = [];
        for(var i = 0; i < this.props.posiciones.length; i++){
            let moneda = <Moneda cx={this.props.posiciones[i][0]} cy={this.props.posiciones[i][1]} />; 
            monedas.push(moneda);
        }

        return(monedas);
    }
}

export default Monedas;