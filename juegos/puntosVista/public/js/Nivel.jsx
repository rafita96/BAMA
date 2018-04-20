class Nivel extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            index: 0
        }
    }

    render(){
        var niveles = [];
        for(var i = 0; i < 3; i++){
            if(this.state.index == i+1){
                niveles.push("col-4 bg-principal");
            }else{
                niveles.push("col-4")
            }
        }

        return(
            <div>
                <div className="row">
                    <div className="col-6 offset-3 text-center">
                        <h3>Selecciona el nivel de dificultad</h3>
                    </div>
                </div>
                <div className="row">
                    <div className={niveles[0]}  
                        onClick={()=>{this.index = 1}}>
                        <h4>Fácil</h4>
                    </div>

                    <div className={niveles[1]}   
                        onClick={()=>{this.index = 2}}>
                        <h4>Medio</h4>
                    </div>

                    <div className={niveles[2]}   
                        onClick={()=>{this.index = 3}}>
                        <h4>Difícil</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 offset-4">
                        <button className="btn btn-principal">Continuar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Nivel;