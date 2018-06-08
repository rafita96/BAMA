class Img extends React.Component{

    componentDidMount(){
        const img = this.refs.image;
    }


  render(){
    return(
        <div>
            <a href={this.props.urlJuego}>
                <img ref="image" src={this.props.url} />
            </a>
        </div>
    )
  }
}



class Bloque extends React.Component{
    render(){
        var url = "/"+this.props.ejercicio["dir"]+"/"+this.props.ejercicio["img"];
        return(
            <div className="col-3">
                <div className="row">
                    <div className="col-12">
                        <Img url={url} urlJuego={"/"+this.props.ejercicio["dir"]+"/"} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <h4><a className="a-principal" href={"/"+this.props.ejercicio["dir"]+"/"}>
                            {this.props.ejercicio["nombre"]}
                        </a></h4>
                    </div>
                </div>
            </div>
        );
    }
}

class Main extends React.Component{

    constructor(props){
        super(props);

        this.bloques = [];
        if(this.props.orientacion.length != 0){
            this.bloques.push(this.crearBloque("Orientación",this.props.orientacion));
        }

        if(this.props.lenguaje.length != 0){
            this.bloques.push(this.crearBloque("Lenguaje",this.props.lenguaje));
        }

        if(this.props.praxias.length != 0){
            this.bloques.push(this.crearBloque("Praxias",this.props.praxias));
        }

        if(this.props.memoria.length != 0){
            this.bloques.push(this.crearBloque("Memoria",this.props.memoria));
        }

        if(this.props.calculo.length != 0){
            this.bloques.push(this.crearBloque("Cálculo",this.props.calculo));
        }
    }

    crearBloque(nombre, ejercicios){
        var bloque = [];
        for(var i = 0; i < ejercicios.length; i++){
            bloque.push(<Bloque ejercicio={ejercicios[i]} />);
        }

        return(
            <div className="row my-3">
                <div className="col-12">
                    <div className="card bg-principal">
                        <div className="card-header">
                            <h1>{nombre}</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {bloque}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        return(<div>{this.bloques}</div>);
    }
}

$(document).ready(function(){
    Consulta.get('/paciente/actual/', function(data){
        if(data["id"] != null){
            mostrarPerfil(data);
        }
    });

    Consulta.get('/juegos/todos/los/nombres', function(data){
        var juegos = data["juegos"];

        ReactDOM.render(<Main 
            orientacion={juegos["O"]} 
            lenguaje={juegos["L"]} 
            praxias={juegos["P"]} 
            memoria={juegos["M"]} 
            calculo={juegos["C"]} />, document.getElementById('juegos'));
    });
}); 