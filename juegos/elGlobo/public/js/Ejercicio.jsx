import Globo from './Globo.jsx';
import Monedas from './Monedas.jsx';
import SVG from './SVG.jsx';

class Ejercicio extends React.Component {
	
	constructor(props){
		super(props);

		this.width = 940;
		this.height = 380;

		this.posXGlobo = 100;
		this.rGlobo = 20;

		this.puntaje = 0;
        this.n = this.props.nivel*7;
        // let n = 21;

        function siguiente(x, self){
            return Math.pow(x,2)%(self.height - 50) - Math.floor(Math.random()*self.height/4);
        }

        let posiciones = [];
        for(var i = 0; i < this.n; i++){
            // posiciones.push([(this.props.width/2)*(i+1), Math.floor(Math.random()*this.props.height)]);
            let x = (this.width/2)*(i+1);
            posiciones.push([x, siguiente(x, this)]);
        }

        this.state = {
            posiciones: posiciones,
            height: this.height/2,
            desviacion: 0
        }
        // console.log(this.state);

        this.momentum = 2;
        this.momentumHilo = 5;

        navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

        this.onMediaSuccess = this.onMediaSuccess.bind(this);
        this.subir = this.subir.bind(this);
        this.bajar = this.bajar.bind(this);        
        this.animarGlobo = this.animarGlobo.bind(this);
        this.terminar = this.terminar.bind(this);

        navigator.getUserMedia({ audio : true}, this.onMediaSuccess, function(){});
    }

    onMediaSuccess(stream){
        var options = {threshold: -49};
        var speechEvents = hark(stream, options);

        speechEvents.on('speaking', this.subir);
        speechEvents.on('stopped_speaking', this.bajar);
        this.intervalo = setInterval((function(){
            let posYGlobo = this.state.height + this.momentum;
            // console.log(posYGlobo);
            let posMonedas = this.state.posiciones;
            for(var i = 0; i < posMonedas.length; i++){
                posMonedas[i][0] = posMonedas[i][0] - 10;

                if(posMonedas[i][0] < 0){
                	posMonedas.splice(i,1);
                }else{
	                let distancia = Math.sqrt( Math.pow(posMonedas[i][0] - this.posXGlobo,2) +
	                							Math.pow(posMonedas[i][1] - posYGlobo, 2 ) );
	                if(distancia <= this.rGlobo+10){
	                	
	                	posMonedas.splice(i, 1);
	                	this.puntaje += 1;
	                }
                }

            }

            let desviacion = this.animarGlobo();

            this.setState({
            	height: posYGlobo,
                posiciones: posMonedas,
                desviacion: desviacion
            });

            if(posMonedas.length == 0){
            	this.terminar();
            }
        
        }).bind(this),100);
    }

    componentWillUnmount(){
        clearInterval(this.intervalo);
    }

    subir(){
        this.momentum = -10;
    }

    bajar(){
        this.momentum = 8;
    }

    terminar(){
    	let porcentaje = (this.puntaje/this.n)*100;
    	this.props.terminar(porcentaje);
    }

    animarGlobo(){
        let copia = this.state.desviacion + this.momentumHilo;
        if(copia > 25 || copia < -25){
            this.momentumHilo *= -1;
        }
        return copia;
    }

	render() {
		return(<div className="text-center"><SVG width={this.width} height={this.height}>
			<g>
				<Monedas posiciones={this.state.posiciones} />
				<Globo cx={this.posXGlobo} cy={this.state.height} 
						r={this.rGlobo} desviacion={this.state.desviacion}/>
			</g>
		</SVG></div>);

	}
}

export default Ejercicio;