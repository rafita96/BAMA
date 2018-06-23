Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

class Camara extends React.Component{

    render(){
        // let angulo = Math.tan(this.props.angulo);
        let x21 = Math.cos(Math.radians(this.props.angulo-45))*10 + this.props.cx;
        let y21 = Math.sin(Math.radians(this.props.angulo-45))*10 + this.props.cy;

        let x22 = Math.cos(Math.radians(this.props.angulo-135))*10 + this.props.cx;
        let y22 = Math.sin(Math.radians(this.props.angulo-135))*10 + this.props.cy;

        if(this.props.seleccionado == this.props.indice){
            var color = "#FFD400";
        }else{
            var color = "#32CD32";
        }

        return(<g>
            <line x1={this.props.cx} y1={this.props.cy} x2={x21} y2={y21} stroke={color} stroke-width="1" />
            <line x1={this.props.cx} y1={this.props.cy} x2={x22} y2={y22} stroke={color} stroke-width="1" />
            <circle cx={this.props.cx} cy={this.props.cy} r={this.props.r} fill={color}/>
        </g>);
    }
}

export default Camara;