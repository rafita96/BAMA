import Hilo from './Hilo.jsx';

class Globo extends React.Component{

    render(){

        return(
            <g>
                <Hilo cx={this.props.cx} cy={this.props.cy} desviacion={this.props.desviacion} />
                <circle cx={this.props.cx} cy={this.props.cy} r={this.props.r} fill="red" />
            </g>
        );
    }
}

export default Globo;