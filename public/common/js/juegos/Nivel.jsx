class Nivel extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            index: 0
        }

        this.seleccionar = this.seleccionar.bind(this);
    }

    seleccionar() {
        if (this.state.index == 0) {
            toastr("¡Usted no ha seleccionado un nivel de dificultad!");
        } else {
            this.props.seleccionar(this.state.index);
        }
    }

    render() {
        var niveles = [];
        for(var i = 0; i < 3; i++){
            if(this.state.index == i+1) {
                niveles.push("col-4 bg-verde border text-white py-3");
            } else {
                niveles.push("col-4 bg-light border py-3")
            }
        }

        return(
            <div>
                <div className="row">
                    <div className="col-6 offset-3 text-center">
                        <h3>Seleccione el nivel de dificultad</h3>
                    </div>
                </div>

                <div className="row text-center">
                    <div className={niveles[0]} onClick={()=>{this.setState({ index: 1 })}}>Fácil</div>

                    <div className={niveles[1]} onClick={()=>{this.setState({ index: 2 })}}>Medio</div>

                    <div className={niveles[2]} onClick={()=>{this.setState({ index: 3 })}}>Difícil</div>
                </div>

                <div className="row">
                    <div className="col-4 text-center mt-3">
                        <a
                            className="btn btn-principal btn-lg"
                            href="/juegos/">
                            Regresar
                        </a>
                    </div>

                    <div className="col-4 offset-4 text-center mt-3">
                        <button onClick={this.seleccionar} className="btn btn-principal btn-lg">Continuar</button>
                    </div>

                </div>
            </div>
        );
    }
}
