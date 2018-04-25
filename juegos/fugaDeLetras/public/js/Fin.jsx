class Fin extends React.Component{

    constructor(props){
        super(props);

        Consulta.post('/paciente/registrar/avance/', {
                juego: 'fugaDeLetras', 
                paciente: this.props.paciente,
                porcentaje: this.props.porcentaje,
                nivel: this.props.nivel,
                fechaInicio: this.props.fechaInicio,
                fechaFin: new Date()
            }, 
            function(error){
                console.log(error);
            }
        );
    }

    render(){
        var clase = "";
        if(this.props.porcentaje >= 80){
            clase = "bg-success";
        }else if(this.props.porcentaje >= 25){
            clase = "bg-warning";
        }else{
            clase = "bg-danger";
        }

        return(
            <div>
                <div className={"row border rounded " + clase}>
                    <div className="col-6 offset-3 text-center text-white">
                        <h1 className="display-1">{Math.round(this.props.porcentaje)}%</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4">
                        <a href="/juegos/" className="btn btn-principal">Lista de juegos</a>
                    </div>
                    <div className="col-4 text-center">
                        <button onClick={this.props.reiniciar} className="btn btn-principal">Volver a jugar</button>
                    </div>
                </div>
            </div>
        );
    }
}
