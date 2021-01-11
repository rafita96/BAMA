import React from 'react';
import styles from './styles.module.css'

class Img extends React.Component{

  constructor(props) {
    super(props);
    this.seleccionar = this.seleccionar.bind(this);
  }

  componentDidMount(){
    const img = this.refs.image;
  }

  seleccionar(id) {
    this.props.seleccionar(id);
  }

  render(){
    if (this.props.id == null) {
    } else if (this.props.id == this.props.seleccionado) {
      return (
        <img className={styles.seleccionado} ref="image" src={this.props.url} onClick={() => this.seleccionar(this.props.id)} />
      );
    }

    return (
      <img className={styles.no_seleccionado} ref="image" src={this.props.url} onClick={() => this.seleccionar(this.props.id)} />
    );
  }
}


export default Img;