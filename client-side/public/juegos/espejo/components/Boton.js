import React from 'react';
import styles from '../styles.module.css';

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
        var clase = "col py-4 mx-1 my-1 border border-dark rounded";
        if(this.props.respuesta[this.props.ren][this.props.col]){
            var color = this.props.color;
        }else{
            var color = "#FFFFFF";
        }
        if (this.props.tipo){
            return(
                <div className={clase} 
                    style={{'background':color, 'height': "100px"}}/>
            );
        }else{
            return(
                <div className={clase}
                    style={{'background':color, 'height': "100px"}} 
                    onClick={this.seleccionar}/>
            );
        }
    }
}

export default Boton;