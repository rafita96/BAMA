class BloqueImg extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            index: null
        }
        
        this.seleccionar = this.seleccionar.bind(this);
    }

    seleccionar(index){
        this.setState({
            index: index
        });
    }

    render(){
        return(
            <div>
                Caso cuando se muestra la vista aerea y luego quien lo vio.
            </div>
        );
    }
}

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
                <div onClick={this.seleccionar}>
                    <i className={"fas fa-camera fa-2x fa-rotate-"+ this.props.rotate} style={{
                        color: "#F0b894"
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
        this.props.seleccionar(index);
    }

    render(){
        return(
            <div className="row text-center">
                    <table style={{
                        zIndex: 10,
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

class Ejercicio extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            pregunta: 0,
            aciertos: 0,
            index: null
        }

        this.seleccionarEjercicios();
        this.siguiente = this.siguiente.bind(this);
        this.seleccionar = this.seleccionar.bind(this);
    }

    seleccionarEjercicios(){
        this.ejercicios = [];
        // 8 ejercicios
        for (var i = 0; i < 8; i++) {
            // 10 carpetas, y 8 imagenes por carpeta
            // Entre 0 y 9
            var carpeta = Math.floor(Math.random() * 9.9);
            var index = Math.floor((Math.random() * 10))*8 + Math.floor((Math.random() * 7));
            while(this.ejercicios.indexOf(index) != -1){
                index = Math.floor((Math.random() * 10))*8 + Math.floor((Math.random() * 7));
            }
            this.ejercicios.push([Math.floor(index/10)+1, index%7 * 45]);
        }
    }

    seleccionar(index){
        this.setState({
            index: index
        });
    }

    siguiente(){
        if(this.state.index == null){
            toastr("No has seleccionado una cámara");
        }else{
            var respuesta = this.ejercicios[this.state.pregunta][1]/45;
            if(this.state.index == respuesta){
                this.setState({
                    aciertos: this.state.aciertos+1,
                    pregunta: this.state.pregunta + 1,
                    index: null
                });
            }else{
                this.setState({
                    pregunta: this.state.pregunta + 1,
                    index: null
                });
            }
        }
    }

    render(){

        if(this.state.pregunta >= this.ejercicios.length){

            var porcentaje = this.state.aciertos/this.ejercicios.length * 100;
            var clase = "";
            if(porcentaje >= 80){
                clase = "bg-success";
            }else if(porcentaje >= 25){
                clase = "bg-warning";
            }else{
                clase = "bg-danger";
            }

            return(
                <div>
                    <div className={"row border rounded " + clase}>
                        <div className="col-6 offset-3 text-center text-white">
                            <h1 className="display-1">{porcentaje}%</h1>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 text-center">
                            <button className="btn btn-principal">Volver a jugar</button>
                        </div>
                    </div>
                </div>
            );
        }else{
            var carpeta = this.ejercicios[this.state.pregunta][0];
            var imagen = this.ejercicios[this.state.pregunta][1];
            return(
                <div>
                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-6">
                            <Img url={"./img/"+carpeta+"/"+imagen+".png"} />
                        </div>

                        <div className="col-sm-12 col-md-6">
                            <Camaras index={this.state.index} seleccionar={this.seleccionar} url={"./img/"+carpeta+"/aereo.png"} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-2 offset-10">
                            <button className="btn btn-principal" onClick={this.siguiente}>Siguiente</button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

class Instrucciones extends React.Component{
    render(){
        return(
            <div>
                <div className="row border rounded my-3">
                    <div className="col-12 text-justify bg-white">
                        <p>{this.props.instrucciones}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 text-center">
                        <button 
                            className="btn btn-principal btn-lg" 
                            onClick={this.props.iniciar}>
                            Iniciar
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

class Bloque extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="row mt-3 border rounded p-3 bg-principal">
                <div className="col-6 offset-3 text-center">
                    <h1>{this.props.nombre}</h1>
                </div>
                <div className="col-12">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class Main extends React.Component{
    constructor(props){
        super(props);

        // El inicio debe estar en false para mostrar las instrucciones
        this.state = {
            inicio: true,
        }

        this.iniciar = this.iniciar.bind(this);
    }

    iniciar(){
        this.setState({
            inicio: true
        });
    }

    render(){

        if(this.state.inicio){
            return(
                <Bloque nombre={this.props.nombre}>
                    <Ejercicio />
                </Bloque>
            );
        }else{
            return(
                <Bloque nombre={this.props.nombre}>
                    <Instrucciones 
                        iniciar={this.iniciar} 
                        instrucciones={this.props.instrucciones} />
                </Bloque>
            );
        }

    }
}

function getInfo(callback){
    d3.json("./data/info.json", function(error, instrucciones){
        d3.json("./meta.json", function(error, nombre){
            callback(nombre["nombre"], instrucciones["instrucciones"]);
        });
    });
}

$(document).ready(function(){
    getInfo(function(nombre, instrucciones){

        ReactDOM.render(<Main 
            nombre={nombre} 
            instrucciones={instrucciones} />, document.getElementById('main'));
    })
}); 