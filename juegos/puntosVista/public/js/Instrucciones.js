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