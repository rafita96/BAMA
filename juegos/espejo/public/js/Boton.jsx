class Boton extends React.Component{
    constructor(props){
        super(props);

        this.seleccionar = this.seleccionar.bind(this);
    }

    seleccionar(){
        this.props.respuesta[this.props.ren][this.props.col] = +!this.props.respuesta[this.props.ren][this.props.col];
        this.props.seleccionar(this.props.respuesta);
    }

    render(){
        var clase = "col py-4 mx-1 my-1 border border-dark rounded boton";
        if(this.props.respuesta[this.props.ren][this.props.col]){
            var color = this.props.color;
        }else{
            var color = "#FFFFFF";
        }
        if (this.props.tipo){
            return(
                <div className={clase} 
                    style={{'background':color}}/>
            );
        }else{
            return(
                <div className={clase}
                    style={{'background':color}} 
                    onClick={this.seleccionar}/>
            );
        }
    }
}