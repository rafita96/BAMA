import React from 'react';

class Main extends React.Component {
	constructor(props) {
        super(props);
        if (this.props.nivel == 1) {
          this.n = 3;
        }
        if (this.props.nivel == 2) {
          this.n = 4;
        }
        if (this.props.nivel == 3) {
          this.n = 5;
        }
        this.m = 4;
        this.generarCartas = this.generarCartas.bind(this);
        this.generarCarta = this.generarCarta.bind(this);
        this.revisar = this.revisar.bind(this);
        var cartas = this.generarCartas();
        var activo = [];
        for (var i = 0; i < this.n * this.m; i++) {
            activo.push(false);
        }
        this.state = {
            cartas: cartas,
            activo: activo,
            selected: -1,
            done: [],
            movimientos: 0,
            locked: false
        }
    }

    generarCartas() {
        var cartas = [];
        if (this.props.nivel == 1) {
          var disponibles = ['abrikos', 'cherno', 'dunia', 'fresa', 'kiwi', 'manzana'];
        }
        if (this.props.nivel == 2) {
          var disponibles = ['abrikos', 'cherno', 'dunia', 'fresa', 'kiwi', 'manzana', 'naranja', 'pera'];
        }
        if (this.props.nivel == 3) {
          var disponibles = ['abrikos', 'cherno', 'dunia', 'fresa', 'kiwi', 'manzana', 'naranja', 'pera', 'platano', 'sandia'];
        }
        var self = this;

        disponibles.forEach(function(disponible) {
            for (var i = 0; i < 2; i++) {
                var carta = self.generarCarta(cartas);
                cartas[carta] = disponible;
            }
        });
        return cartas;
    }

    generarCarta(cartas) {
        var carta = Math.floor(Math.random() * this.n * this.m);
        while (cartas[carta]) {
            var carta = Math.floor(Math.random() * this.n * this.m);
        }
        return carta;
    }

    revisar (i) {
        if (this.state.selected == i) {
            var activo = this.state.activo.map(x => x);
            activo[i] = false;
            this.setState({
              movimientos: this.state.movimientos + 1,
              selected: -1,
              activo: activo
            });
            return;
        }
        if (this.state.cartas[this.state.selected] == this.state.cartas[i]) {
            var done = this.state.done.concat(i).concat(this.state.selected);
            this.setState({
              movimientos: this.state.movimientos + 1,
              done: done,
              selected: -1
            });
            if (done.length == this.n * this.m) {
              var puntopunto = 100 + (this.props.nivel * 4 + 7) * 5 - this.state.movimientos * 5;
                puntopunto = Math.max(0, puntopunto);
                puntopunto = Math.min(100, puntopunto);
                this.props.terminar(puntopunto);
            }
        } else {
            this.setState({
                locked: true
            });
            setTimeout(() => {
                var activo = this.state.activo.map(x => x);
                activo[i] = false;
                activo[this.state.selected] = false;
                this.setState({
                  movimientos: this.state.movimientos + 1,
                  activo: activo,
                  selected: -1,
                  locked: false
                });
            }, 1000 * (4 - this.props.nivel));
        }
    }

	render() {
    if (this.props.nivel < 3) {
      var cartas = this.state.cartas.map((carta, i) =>   
      <div style={{ float: 'left', padding: '5px', width: '25%' }}>
          <img style={{ border: this.state.done.indexOf(i) >= 0 ? 'solid 5px green' : '', cursor: 'pointer', height: '280px', objectFit: 'cover', minHeight: '280px', maxWidth: '80%', width: '80%' }} src={'/juegos/'+this.props.filename+'/data/img/' + (this.state.activo[i] ? carta : 'tarjeta') + '.png'} className="rounded mx-auto d-block" onClick={() => {
                  if (this.state.locked || this.state.done.indexOf(i) >= 0) return;
                  var activo = this.state.activo.map(x => x);
                  activo[i] = true;
                  if (this.state.selected == -1) {
                      this.setState({
                          activo: activo,
                          selected: i
                      });
                  } else {
                      this.setState({
                          activo: activo
                      });
                      this.revisar(i);
                  }
              }} />
          </div>
      );
    }
    if (this.props.nivel == 3) {
        var cartas = this.state.cartas.map((carta, i) =>
            <div style={{ float: 'left', padding: '5px', width: '20%' }}>
                <img style={{ border: this.state.done.indexOf(i) >= 0 ? 'solid 5px green' : '', cursor: 'pointer', height: '280px', objectFit: 'cover', minHeight: '280px', maxWidth: '100%', width: '100%' }} src={'/juegos/'+this.props.filename+'/data/img/' + (this.state.activo[i] ? carta : 'tarjeta') + '.png'} className="rounded mx-auto d-block" onClick={() => {
                    if (this.state.locked || this.state.done.indexOf(i) >= 0) return;
                    var activo = this.state.activo.map(x => x);
                    activo[i] = true;
                    if (this.state.selected == -1) {
                        this.setState({
                            activo: activo,
                            selected: i
                        });
                    } else {
                        this.setState({
                            activo: activo
                        });
                        this.revisar(i);
                    }
                }} />
            </div>
        );
    }
    return (
        <div>
        <div style={{ padding: '5px' }}>
            {cartas}
        </div>
        </div>
    );
    }
}

export default Main;