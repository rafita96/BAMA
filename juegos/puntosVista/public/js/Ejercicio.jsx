class Ejercicio extends React.Component{

    constructor(props){
        super(props);

        this.puntaje = 0;
        this.numeroPreguntas = 4;

        this.state = {
            seleccionado: -1,
            pregunta: 0
        }

        this.seleccionarEjercicios();

        this.seleccionar = this.seleccionar.bind(this);
        this.siguiente = this.siguiente.bind(this);
    }

    seleccionar(index){
        this.setState({
            seleccionado: index
        });
    }

    siguiente(){
        if(this.state.seleccionado != -1){
            if(this.state.seleccionado*45 == this.ejercicios[this.state.pregunta][1]){
                this.puntaje += 1;
            }

            if(this.state.pregunta + 1 == this.numeroPreguntas){
                this.props.terminar((this.puntaje/this.numeroPreguntas)*100);
            }else{
                this.setState({
                    seleccionado: -1,
                    pregunta: this.state.pregunta+1
                });
            }
        }else{
            toastr("¡Usted no ha seleccionado una respuesta!");
        }
    }

    seleccionarEjercicios(){
        this.ejercicios = [];
        // 8 ejercicios
        for (var i = 0; i < this.numeroPreguntas; i++) {
            // 10 carpetas, y 8 imagenes por carpeta
            // Entre 0 y 9
            var carpeta = Math.floor(Math.random() * 10);
            if(carpeta == 10){
                carpeta--
            };
            carpeta++;

            var imagen = Math.floor((Math.random() * 8));
            if(imagen == 8) {
                imagen = imagen - 1;
            };
            imagen = imagen*45;

            var index = this.ejercicios.indexOf(carpeta);

            while(index != -1 && this.ejercicios[index].indexOf(imagen) != -1){
                var carpeta = Math.floor(Math.random() * 10);
                if(carpeta == 10){
                    carpeta--
                };
                carpeta++;

                var imagen = Math.floor((Math.random() * 8));
                if(imagen == 8) {
                    imagen = imagen - 1;
                };
                imagen = imagen*45;

                var index = this.ejercicios.indexOf(carpeta);
            }
            this.ejercicios.push([carpeta, imagen]);
        }
    }

    render(){

        let carpeta = this.props.nivel + "/" + this.ejercicios[this.state.pregunta][0];

        var imagenSeleccionada = "./../../../../public/common/img/puntosVista/"+ carpeta + "/" + this.ejercicios[this.state.pregunta][1] + ".png"

        return(<div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-6">
                    <Img url={imagenSeleccionada} />
                    </div>

                    <div className="col-6">
                        <svg viewBox="0 0 100 60">
                            <image y="10"
                                width="100" height="40"
                                href={"./../../../../public/common/img/puntosVista/"+carpeta+"/aereo.png"} />

                            <Camara seleccionado={this.state.seleccionado} seleccionar={this.seleccionar}
                                    indice={5} angulo={135} cx={29} cy={10} r={2} />
                            <Camara seleccionado={this.state.seleccionado} seleccionar={this.seleccionar}
                                    indice={4} angulo={180} cx={50} cy={6} r={2} />
                            <Camara seleccionado={this.state.seleccionado} seleccionar={this.seleccionar}
                                    indice={3} angulo={225} cx={71} cy={10} r={2} />

                            <Camara seleccionado={this.state.seleccionado} seleccionar={this.seleccionar}
                                    indice={6} angulo={90} cx={25} cy={29} r={2} />
                            <Camara seleccionado={this.state.seleccionado} seleccionar={this.seleccionar}
                                    indice={2} angulo={270} cx={75} cy={29} r={2} />

                            <Camara seleccionado={this.state.seleccionado} seleccionar={this.seleccionar}
                                    indice={7} angulo={45} cx={29} cy={50} r={2} />
                            <Camara seleccionado={this.state.seleccionado} seleccionar={this.seleccionar}
                                    indice={0} angulo={0} cx={50} cy={54} r={2} />
                            <Camara seleccionado={this.state.seleccionado} seleccionar={this.seleccionar}
                                    indice={1} angulo={315} cx={71} cy={50} r={2} />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <button className="btn btn-principal btn-lg" onClick={this.siguiente}>Siguiente</button>
                </div>
            </div>
        </div>
      );
    }
}

export default Ejercicio;
