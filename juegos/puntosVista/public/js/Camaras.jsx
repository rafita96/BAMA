import Img from './Img.jsx';

class Camara extends React.Component{

    constructor(props){
        super(props);

        this.seleccionar = this.seleccionar.bind(this);
    }

    seleccionar(){
        this.props.seleccionar(this.props.index);
    }

    render(){

        if(this.props.seleccionado == this.props.index){
            return(
                <div>
                    <i className={"fas fa-camera fa-2x fa-rotate-"+ this.props.rotate} style={{
                        color: "#F0b894"
                    }}></i>
                </div>
            );
        }else if(typeof this.props.seleccionar == "undefined"){
           return(
                <div>
                    <i className={"fas fa-camera fa-2x fa-rotate-"+ this.props.rotate} style={{
                        color: "#009432"
                    }}></i>
                </div>
            ); 
        }else{
            return(
                <div onClick={this.seleccionar}>
                    <i className={"fas fa-camera fa-2x fa-rotate-"+ this.props.rotate} style={{
                        color: "#009432"
                    }}></i>
                </div>
            ); 
        }

    }
}

class Camaras extends React.Component{
    constructor(props){
        super(props);

        this.seleccionar = this.seleccionar.bind(this);
    }

    seleccionar(index){
        if(typeof this.props.seleccionar != "undefined"){
            this.props.seleccionar(index);
        }
    }

    render(){
        return(
            <div className="row text-center">
                    <table style={{
                        zIndex: 2,
                        position: "absolute",
                        width: "100%",
                        height: "100%"
                    }}>
                        <tr>
                            <td className="text-center align-top"><Camara seleccionado={this.props.index} index={5} seleccionar={this.seleccionar} rotate="-45" /></td>
                            <td className="text-center align-top"><Camara seleccionado={this.props.index} index={4} seleccionar={this.seleccionar} rotate="0" /></td>
                            <td className="text-center align-top"><Camara seleccionado={this.props.index} index={3} seleccionar={this.seleccionar} rotate="45" /></td>
                        </tr>

                        <tr>
                            <td className="text-center"><Camara seleccionado={this.props.index} index={6} seleccionar={this.seleccionar} rotate="270" /></td>
                            <td className="text-center"></td>
                            <td className="text-center"><Camara seleccionado={this.props.index} index={2} seleccionar={this.seleccionar} rotate="90" /></td>
                        </tr>

                        <tr>
                            <td className="text-center align-bottom"><Camara seleccionado={this.props.index} index={7} seleccionar={this.seleccionar} rotate="-135" /></td>
                            <td className="text-center align-bottom"><Camara seleccionado={this.props.index} index={0} seleccionar={this.seleccionar} rotate="180" /></td>
                            <td className="text-center align-bottom"><Camara seleccionado={this.props.index} index={1} seleccionar={this.seleccionar} rotate="135" /></td>
                        </tr>
                    </table>
                <div className="col-10 offset-1" style={{ 
                        position: "absolute",
                        width: "100%",
                        height: "100%" 
                    }}>
                    <table style={{ 
                        width: "100%",
                        height: "100%" 
                    }}>
                        <tr><td className="align-middle"><Img url={this.props.url} /></td></tr>
                    </table>
                </div>
            </div>

                
        );
    }
}

export default Camaras;