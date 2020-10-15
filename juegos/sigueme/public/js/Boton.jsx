class Boton extends React.Component{
    constructor(props){
        super(props);

        this.seleccionar = this.seleccionar.bind(this);
    }

    seleccionar(){
        if(this.props.posicion != -1){
            this.props.deseleccionar(this.props.index);
        }else{
            this.props.seleccionar(this.props.index);
        }
    }

    render(){
        if(this.props.seleccionado){

            return(
                <div className="col py-5 mx-1 border border-dark rounded"
                    style={{background:this.props.color}}>
<<<<<<< HEAD
                    <audio ref="audio_tag" src="./data/do.mp3" autoPlay/>
=======
                  <audio ref="audio_tag" src={this.props.url} autoPlay/>
>>>>>>> master
                </div>
            );
        }
        else if(this.props.posicion != -1){
            return(
                <div className="col py-4 mx-1 border border-dark rounded text-center"
<<<<<<< HEAD
                    style={{background:this.props.color}} onClick={this.seleccionar}
                ><h1 className="unselectable text-white">
                    {this.props.posicion+1}
                </h1></div>
=======
                    style={{background:this.props.color}} onClick={this.seleccionar}>
                  <audio ref="audio_tag" src={this.props.url} autoPlay/>
                  <h1 className="unselectable text-white">
                      {this.props.posicion+1}
                  </h1>
                </div>
>>>>>>> master
            );
        }else{
            return(
                <div className="col py-5 mx-1 bg-light border border-dark rounded"
                    onClick={this.seleccionar}></div>
            );
        }
    }
}
