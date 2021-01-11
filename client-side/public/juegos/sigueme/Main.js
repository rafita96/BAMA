import React from 'react';
import Boton from './components/Boton';
import Mensaje from './components/Mensaje';
import { shuffle } from '../../../lib/helpers';

class Main extends React.Component{

    constructor(props){
        super(props);

        this.colores = shuffle(["#c0392b", "#27ae60", "#8e44ad", "#f1c40f", "#1abc9c", "#e84393", "#6D214F"]);

        this.sonido = ["do", "re", "mi", "fa", "sol"];

        this.estados = {secuencia: 0, espera: 1, fin: 2};
        this.mensaje = {observa: "Observa", siguieme: "Repite la secuencia"};
        this.tiempoMuestra = 1000;

        this.ejercicio = 0;
        this.correctos = 0;

        let botonesPorNivel = [3,4,5];
        this.numBotones = botonesPorNivel[this.props.nivel-1];

        var secuencia = [];
        for(var i = 0; i < this.numBotones; i++){
            secuencia.push(i);
        }
        this.secuencia = shuffle(secuencia);

        this.state={
            mostrarMensaje: true,
            estado: this.estados["secuencia"],
            indexSecuencia: 0,
            seleccionados: []
        }

        this.seleccionar = this.seleccionar.bind(this);
        this.deseleccionar = this.deseleccionar.bind(this);

        this.mostrarSecuencia = this.mostrarSecuencia.bind(this);
        this.crearBotones = this.crearBotones.bind(this);
        this.siguiente = this.siguiente.bind(this);
    }

    mostrarSecuencia(){
        if(this.state.indexSecuencia < this.numBotones){
            let index = this.state.indexSecuencia + 1;

            setTimeout((function(){
                this.setState({
                    indexSecuencia: index
                });
            }).bind(this),this.tiempoMuestra);

        }else{
            this.setState({
                indexSecuencia: 0,
                estado: this.estados["espera"],
                mostrarMensaje: true
            });
        }
    }

    seleccionar(index){
        let seleccionados = this.state.seleccionados;
        seleccionados.push(index);
        this.setState({
            seleccionados: seleccionados
        });
    }

    deseleccionar(index){
        var seleccionados = this.state.seleccionados;
        seleccionados.splice(seleccionados.indexOf(index), 1);
        this.setState({
            seleccionados: seleccionados
        });
    }

    crearBotones(mensajes){
        this.botones = [];
        for(var i = 0; i < this.numBotones; i++){
            if(!mensajes && i == this.secuencia[this.state.indexSecuencia]){
                var seleccionado = true;
            }else{
                var seleccionado = false;
            }

            let boton = (
                <Boton
                    seleccionar={this.seleccionar}
                    deseleccionar={this.deseleccionar}
                    index={i}
                    seleccionado={seleccionado}
                    color={this.colores[i]}
                    url={'/juegos/'+this.props.filename+'/data/sonidos/'+this.sonido[i]+'.mp3'} />
                );

            this.botones.push(boton);
        }
    }

    siguiente(){
        if(this.ejercicio < 3){
            this.ejercicio++;

            for(var i = 0; i < this.numBotones; i++){
                if(this.secuencia[i] == this.state.seleccionados[i]){
                    this.correctos++;
                }
            }

            var secuencia = [];
            for(var i = 0; i < this.numBotones; i++){
                secuencia.push(i);
            }
            this.secuencia = shuffle(secuencia);

            this.setState({
                mostrarMensaje: true,
                estado: this.estados["secuencia"],
                indexSecuencia: 0,
                seleccionados: []
            });
        }else{
            for(var i = 0; i < this.numBotones; i++){
                if(this.secuencia[i] == this.state.seleccionados[i]){
                    this.correctos++;
                }
            }

            this.props.terminar((this.correctos/((this.ejercicio+1)*this.numBotones))*100);
        }
    }

    render(){

        if(this.state.mostrarMensaje){
            setTimeout((function(){this.setState({mostrarMensaje: false})}).bind(this), 1000);

            switch(this.state.estado){
                case this.estados["secuencia"]:
                    var mensaje = this.mensaje["observa"];
                    break;

                case this.estados["espera"]:
                    var mensaje = this.mensaje["siguieme"];
                    break;
            }
            this.botones = [];
            for(var i = 0; i < this.numBotones; i++){
                let boton = (
                    <Boton
                        seleccionar={this.seleccionar}
                        deseleccionar={this.deseleccionar}
                        index={i}
                        seleccionado={false}
                        color={this.colores[i]}
                        posicion={-1}
                        url={'/juegos/'+this.props.filename+'/data/sonidos/'+this.sonido[i]+'.mp3'} />
                    );

                this.botones.push(boton);
            }

            return(
                <div>
                    <Mensaje mensaje={mensaje} />
                    <div className="row equal mt-3">{this.botones}</div>
                </div>
            );
        }else{
            switch(this.state.estado){
                case this.estados["secuencia"]:
                    this.mostrarSecuencia();

                    this.botones = [];
                    for(var i = 0; i < this.numBotones; i++){
                        if(i == this.secuencia[this.state.indexSecuencia]){
                            var seleccionado = true;
                        }else{
                            var seleccionado = false;
                        }

                        let boton = (
                            <Boton
                                seleccionar={()=>{}}
                                deseleccionar={()=>{}}
                                index={i}
                                seleccionado={seleccionado}
                                color={this.colores[i]}
                                posicion={-1}
                                url={'/juegos/'+this.props.filename+'/data/sonidos/'+this.sonido[i]+'.mp3'} />
                            );

                        this.botones.push(boton);
                    }
                    return(
                        <div>
                            <Mensaje mensaje="Observa"/>
                            <div className="row equal mt-3">{this.botones}</div>
                        </div>
                    );
                    break;

                case this.estados["espera"]:
                    this.botones = [];
                    for(var i = 0; i < this.numBotones; i++){

                        let posicion = this.state.seleccionados.indexOf(i);

                        let boton = (
                            <Boton
                                seleccionar={this.seleccionar}
                                deseleccionar={this.deseleccionar}
                                index={i}
                                seleccionado={false}
                                color={this.colores[i]}
                                posicion={posicion}
                                url={'/juegos/'+this.props.filename+'/data/sonidos/'+this.sonido[i]+'.mp3'} />
                            );

                        this.botones.push(boton);
                    }

                    if(this.state.seleccionados.length == this.numBotones){
                        var siguiente = (<button className="btn btn-principal btn-lg" onClick={this.siguiente}>Siguiente</button>);
                    }else{
                        var siguiente = (<button className="btn btn-principal btn-lg" onClick={()=>{this.props.addToast("¡Usted no ha seleccionado una respuesta!")}}>Siguiente</button>);
                    }
                    return(
                            <div className="row">
                                <div className="col-12">
                                    <Mensaje mensaje="Repite la secuencia"/>
                                </div>
                                <div className="col-12">
                                    <div className="row equal mt-3">{this.botones}</div>
                                </div>
                                <div className="col-2 offset-10 mt-2">
                                    {siguiente}
                                </div>
                            </div>
                        );
                    break;
            }
        }
    }
}

export default Main;