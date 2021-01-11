import React from 'react';
import styles from './styles.module.css'

class Opcion extends React.Component{

  constructor(props) {
    super(props);
    this.seleccionar = this.seleccionar.bind(this);
  }

  seleccionar(id) {
    this.props.seleccionar(id);
  }

  render(){
    if (this.props.id == null) {
    } else if (this.props.id == this.props.seleccionado) {
      return (
        <div className={`${styles.boton} ${styles.seleccionado} col p-4`} onClick={() => this.seleccionar(this.props.id)}>
          <p className={`${styles.unselectable} h2`}>{this.props.children}</p>
        </div>
      );
    }

    return (
      <div className={`${styles.boton} ${styles.no_seleccionado} col p-4`} onClick={() => this.seleccionar(this.props.id)}>
        <p className={`${styles.unselectable} h2`}>{this.props.children}</p>
      </div>
    );
  }
}


export default Opcion;