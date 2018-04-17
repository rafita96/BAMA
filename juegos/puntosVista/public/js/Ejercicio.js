class Ejercicio extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            pregunta: 0,
            aciertos: 0,
            index: null
        }

        this.numeroPreguntas = 8;

        this.seleccionarEjercicios();
        this.siguiente = this.siguiente.bind(this);
        this.seleccionar = this.seleccionar.bind(this);
    }

    seleccionarEjercicios(){
        this.ejercicios = [];
        // 8 ejercicios
        for (var i = 0; i < this.numeroPreguntas; i++) {
            // 10 carpetas, y 8 imagenes por carpeta
            // Entre 0 y 9
            var carpeta = Math.floor(Math.random() * 10);
            if(carpeta == 10) carpeta--;
            carpeta++;

            var imagen = Math.floor((Math.random() * 8));
            if(imagen == 8) imagen--;
            imagen = imagen*45;

            var index = this.ejercicios.indexOf(carpeta);

            while(index != -1 && this.ejercicios[index].indexOf(imagen) != -1){
                var carpeta = Math.floor(Math.random() * 10);
                if(carpeta == 10) carpeta--;
                carpeta++;

                var imagen = Math.floor((Math.random() * 8));
                if(imagen == 8) imagen--;
                imagen = imagen*45;

                var index = this.ejercicios.indexOf(carpeta);
            }
            this.ejercicios.push([carpeta, imagen]);
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
            this.props.terminar(porcentaje);
            return(<div></div>);
        }else{
            var carpeta = this.ejercicios[this.state.pregunta][0];
            var imagen = this.ejercicios[this.state.pregunta][1];

            if(this.state.pregunta < this.numeroPreguntas/2){
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
            }else{
                var imagenSeleccionada = <Img url={"./img/notselected.jpg"} />;
                if(this.state.index != null){
                    var imagenSeleccionada = <Img url={"./img/"+carpeta+"/"+this.state.index*45+".png"} />;
                }
                return(
                    <div>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6">
                               {imagenSeleccionada}
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <Camaras index={imagen/45} url={"./img/"+carpeta+"/aereo.png"} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-10">
                                <BloqueImg carpeta={carpeta} seleccionar={this.seleccionar} />
                            </div>
                            <div className="col-2">
                                <button className="btn btn-principal" onClick={this.siguiente}>Siguiente</button>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}