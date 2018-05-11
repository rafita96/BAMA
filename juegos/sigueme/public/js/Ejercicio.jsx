/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

class Ejercicio extends React.Component{

    constructor(props){
        super(props);

        this.estados = {"secuencia": 0, "espera": 1, "mensaje": 2};
        this.mensajes = {"observa": "Observa", "sigueme": "Vamos!"};
        this.tiempoMuestra = 1;

        this.numBotones = [3, 5, 7];
        this.colores = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#651067", "#5574a6", "#3b3eac"];

        this.botones = [];
        this.seleccionados = [];

        var secuencia = [];
        // No olvidar poner el props.nivel en lugar de la constante
        for(var i = 0; i < this.numBotones[0]; i++){
            var boton = (
                <div className="col py-5 mx-1 bg-light border border-dark rounded"></div>
                );

            this.botones.push(boton);
            secuencia.push(i);
        }
            
        this.mensaje = this.mensajes["observa"];

        this.state = {
            ejercicio: 0,
            estado: this.estados["mensaje"],
            secuencia: shuffle(secuencia),
            index: 0
        };
    }

    mostrarActual(){
        let index = this.state.index;
        if(this.state.index < this.numBotones[0]){

            this.botones[this.state.secuencia[this.state.index]] = (
                <div className="col py-5 mx-1 bg-success border border-dark rounded"></div>
            );
            var contador = 0;
            let tiempoMuestra = this.tiempoMuestra;
            var myInterval = setInterval(function(){
                if(contador == tiempoMuestra){
                    limpiar(index+1);
                }
                else{
                    contador++;
                }

            },1000);

            var limpiar = (function(index){
                clearInterval(myInterval);
                this.botones[this.state.secuencia[index-1]] = (
                    <div className="col py-5 mx-1 bg-light border border-dark rounded"></div>
                );
                this.setState({
                    index: index
                });
            }).bind(this);

        }else{
            this.botones[this.state.secuencia[index-1]] = (
                <div className="col py-5 mx-1 bg-light border border-dark rounded"></div>
            );

            this.setState({
                index: 0,
                estado: this.estados["mensaje"]
            });

        }
    }

    quitarMensaje(siguiente){
        this.setState({
            estado: this.estados[siguiente]
        });
    }

    seleccionar(index){
        this.seleccionados.push(index);
        this.setState({

        });
    }

    render(){
        switch(this.state.estado){
            case this.estados["mensaje"]:
                var quitarMensaje = this.quitarMensaje.bind(this);
                var paso = false;

                var mensaje = this.mensaje;
                if(this.mensaje == this.mensajes["observa"]){
                    this.mensaje = this.mensajes["sigueme"];
                    var siguiente = "secuencia";
                }else{
                    this.mensaje = this.mensajes["observa"];
                    var siguiente = "espera";
                }

                var intervalo = setInterval(function(){
                    if(paso){
                        quitarMensaje(siguiente);
                        limpiar();
                    }else{
                        paso = true;
                    }
                },1000);

                function limpiar(){
                    clearInterval(intervalo);
                }

                return(
                    <div>
                        <div className="row">
                            <Mensaje mensaje={mensaje} />
                        </div>
                        <div className="row equal mt-3">
                            {this.botones}
                        </div>
                    </div>
                );

            case this.estados["secuencia"]:
                this.mostrarActual();

            case this.estados["espera"]:
                return(
                    <div>
                        <div className="row equal mt-3">
                            {this.botones}
                        </div>
                    </div>
                    );
                break;
        }
    }
}