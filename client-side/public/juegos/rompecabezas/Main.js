import React from 'react';

class Main extends React.Component {
	constructor(props) {
      super(props);
      this.generarPiezas = this.generarPiezas.bind(this);
      this.colocarPieza = this.colocarPieza.bind(this);
      if (this.props.nivel == 1) {
        var disponibles = ['africa', 'alpaca', 'arca', 'caballos', 'castillo', 'changos', 'cocina', 'corbatas', 'desayuno', 'gazela', 'girasol', 'guacamallo', 'leopardo', 'panda', 'pingui', 'pitbulazos', 'ranita', 'steppe', 'tortuga', 'viejito'];
      }
      if (this.props.nivel == 2) {
        var disponibles = ['arbol', 'balcon', 'cabra', 'cafe', 'caracol', 'cascada', 'ciudad', 'colibri', 'elefantes', 'favelas', 'flores', 'hamburguesa', 'liebre', 'maple', 'mono', 'nave', 'parque', 'piedritas', 'suculenta', 'tigre'];
      }
      if (this.props.nivel == 3) {
        var disponibles = ['aerostatico', 'bote', 'caballito', 'cactus', 'cañon', 'casette', 'doggo', 'escalera', 'espiral', 'family', 'fox', 'huevos', 'lamparas', 'moras', 'mosaico', 'pasta', 'pintura', 'plumas', 'techo', 'vitral'];
      }
      var randomizador = Math.floor(Math.random() * 20);
      if (this.props.nivel == 1) {
        this.n = 3;
        this.total = this.n * this.n;
        this.rompecabezas = disponibles[randomizador];
        var piezas = this.generarPiezas();
        this.state = {
            selected: {
                x: -1,
                y: -1
            },
            done: [
                [ false, false, false ],
                [ false, false, false ],
                [ false, false, false ]
            ],
            puzzle: [
                [ false, false, false ],
                [ false, false, false ],
                [ false, false, false ]
            ],
            movimientos: 0,
            piezas: piezas
        }
      }
      if (this.props.nivel == 2) {
        this.n = 4;
        this.total = this.n * this.n;
        this.rompecabezas = disponibles[randomizador];
        var piezas = this.generarPiezas();
        this.state = {
            selected: {
                x: -1,
                y: -1
            },
            done: [
                [ false, false, false, false ],
                [ false, false, false, false ],
                [ false, false, false, false ],
                [ false, false, false, false ]
            ],
            puzzle: [
                [ false, false, false, false ],
                [ false, false, false, false ],
                [ false, false, false, false ],
                [ false, false, false, false ]
            ],
            movimientos: 0,
            piezas: piezas
        }
      }
      if (this.props.nivel == 3) {
        this.n = 5;
        this.total = this.n * this.n;
        this.rompecabezas = disponibles[randomizador];
        var piezas = this.generarPiezas();
        this.state = {
            selected: {
                x: -1,
                y: -1
            },
            done: [
                [ false, false, false, false, false ],
                [ false, false, false, false, false ],
                [ false, false, false, false, false ],
                [ false, false, false, false, false ],
                [ false, false, false, false, false ]
            ],
            puzzle: [
              [ false, false, false, false, false ],
              [ false, false, false, false, false ],
              [ false, false, false, false, false ],
              [ false, false, false, false, false ],
              [ false, false, false, false, false ]
            ],
            movimientos: 0,
            piezas: piezas
        }
      }
    }

    generarPiezas () {
      // https://pinetools.com/es/partir-imagenes
      var piezas = [];
      for (var i = 0; i < this.n; i++) {
          var row = [];
          for (var j = 0; j < this.n; j++) {
              var n = Math.floor(Math.random() * this.n);
              while (row.indexOf(n) >= 0) {
                  n = Math.floor(Math.random() * this.n);
              }
              row.push(n);
          }
          piezas.push(row);
      }
      return piezas;
    }

    colocarPieza (i, j) {
        var done = this.state.done.map(x => x.map(y => y));
        var puzzle = this.state.puzzle.map(x => x.map(y => y));
        done[i][j] = this.state.selected.x >= 0 && this.state.selected.y == i && this.state.piezas[i][this.state.selected.x] == j;
        puzzle[i][j] = !puzzle[i][j];
        this.setState({
            done: done,
            movimientos: this.state.movimientos + 1,
            selected: {
                x: -1,
                y: -1
            }
        }, () => {
            if (this.state.done.every(x => x.every(y => y))) {
                var puntaje = 100 - (this.state.movimientos - this.total) * 5;
                puntaje = Math.max(0, puntaje);
                puntaje = Math.min(100, puntaje);
                this.props.terminar(puntaje);
            }
        });
    }

	render() {
    if (this.props.nivel == 1) {
      let puzzle = [];
      for (let i = 0; i < this.n; i++) {
          let row = [];
          for (let j = 0; j < this.n; j++) {
              let content = this.state.done[i][j]
                  ? <img src={'/juegos/'+this.props.filename+'/data/img'+"/facil/" + this.rompecabezas + "/fila-" + (i + 1) + "-col-" + (j + 1) + ".png"} style={{ maxWidth: '100%', minWidth: '100%', maxHeight: '100%', minHeight: '100%' }} />
                  : '';
              row.push(
                <div style={{ background: '#fffdd0', border: 'solid black 2px', float: 'left', height: '112.77px', width: '33.3%' }} onClick={() => {
                   this.colocarPieza(i, j);
                  }}>
                      {content}
                  </div>
              );
          }
          puzzle.push(<div style={{ borderCollapse: 'collapse' }}>{row}</div>);
      } //fila es i, columna es pieza
      var piezas = this.state.piezas.map((row, i) => {
          var grid = row.map((pieza, j) => {
              var active = this.state.selected.x == j && this.state.selected.y == i;
              var content = this.state.done[i][pieza] ? '' : <img src={'/juegos/'+this.props.filename+'/data/img'+"/facil/" + this.rompecabezas + "/fila-" + (i + 1) + "-col-" + (pieza + 1) + ".png"} style={{ maxWidth: '100%', minWidth: '100%', maxHeight: '100%', minHeight: '100%' }} onClick={() => {
                  this.setState({
                      selected: {
                          x: j,
                          y: i
                      }
                  });
              }} />;
              return (
                  <div style={{ background: '#fffdd0', border: 'solid ' + (active ? 'red' : 'black') + ' 2px', float: 'left', height: '112.77px', width: '33.3%' }}>
                      {content}
                  </div>
              );
          });
          return (
              <div style={{ borderCollapse: 'collapse' }}>{grid}</div>
          );
      });
      return (
          <div className="row">
              <div className="col-sm-4">
                  {piezas}
              </div>
              <div className="col-sm-4">
                  {puzzle}
              </div>
              <div className="col-sm-4">
                  <img src={'/juegos/'+this.props.filename+'/data/img'+"/facil/" + this.rompecabezas + "/" + this.rompecabezas + ".png"} style={{ maxWidth: '100%', minWidth: '100%' }} />
              </div>
          </div>
      );
    }
    if (this.props.nivel == 2) {
      let puzzle = [];
      for (let i = 0; i < this.n; i++) {
          let row = [];
          for (let j = 0; j < this.n; j++) {
              let content = this.state.done[i][j]
                  ? <img src={'/juegos/'+this.props.filename+'/data/img'+"/medio/" + this.rompecabezas + "/fila-" + (i + 1) + "-col-" + (j + 1) + ".png"} style={{ maxWidth: '100%', minWidth: '100%', maxHeight: '100%', minHeight: '100%' }} />
                  : '';
              row.push(
                <div style={{ background: '#fffdd0', border: 'solid black 2px', float: 'left', height: '84.66px', width: '25%' }} onClick={() => {
                   this.colocarPieza(i, j);
                  }}>
                      {content}
                  </div>
              );
          }
          puzzle.push(<div style={{ borderCollapse: 'collapse' }}>{row}</div>);
      }
      var piezas = this.state.piezas.map((row, i) => {
          var grid = row.map((pieza, j) => {
              var active = this.state.selected.x == j && this.state.selected.y == i;
              var content = this.state.done[i][pieza] ? '' : <img src={'/juegos/'+this.props.filename+'/data/img'+"/medio/" + this.rompecabezas + "/fila-" + (i + 1) + "-col-" + (pieza + 1) + ".png"} style={{ maxWidth: '100%', minWidth: '100%', maxHeight: '100%', minHeight: '100%' }} onClick={() => {
                  this.setState({
                      selected: {
                          x: j,
                          y: i
                      }
                  });
              }} />;
              return (
                  <div style={{ background: '#fffdd0', border: 'solid ' + (active ? 'red' : 'black') + ' 2px', float: 'left', height: '84.66px', width: '25%' }}>
                      {content}
                  </div>
              );
          });
          return (
              <div style={{ borderCollapse: 'collapse' }}>{grid}</div>
          );
      });
      return (
          <div className="row">
              <div className="col-sm-4">
                  {piezas}
              </div>
              <div className="col-sm-4">
                  {puzzle}
              </div>
              <div className="col-sm-4">
              <img src={'/juegos/'+this.props.filename+'/data/img'+"/medio/" + this.rompecabezas + "/" + this.rompecabezas + ".png"} style={{ maxWidth: '100%', minWidth: '100%' }} />
              </div>
          </div>
      );
    }
    if (this.props.nivel == 3) {
      let puzzle = [];
      for (let i = 0; i < this.n; i++) {
          let row = [];
          for (let j = 0; j < this.n; j++) {
              let content = this.state.done[i][j]
                  ? <img src={'/juegos/'+this.props.filename+'/data/img'+"/dificil/" + this.rompecabezas + "/fila-" + (i + 1) + "-col-" + (j + 1) + ".png"} style={{ maxWidth: '100%', minWidth: '100%', maxHeight: '100%', minHeight: '100%' }} />
                  : '';
              row.push(
                <div style={{ background: '#fffdd0', border: 'solid black 2px', float: 'left', height: '67.72px', width: '20%' }} onClick={() => {
                   this.colocarPieza(i, j);
                  }}>
                      {content}
                  </div>
              );
          }
          puzzle.push(<div style={{ borderCollapse: 'collapse' }}>{row}</div>);
      }
      var piezas = this.state.piezas.map((row, i) => {
          var grid = row.map((pieza, j) => {
              var active = this.state.selected.x == j && this.state.selected.y == i;
              var content = this.state.done[i][pieza] ? '' : <img src={'/juegos/'+this.props.filename+'/data/img'+"/dificil/" + this.rompecabezas + "/fila-" + (i + 1) + "-col-" + (pieza + 1) + ".png"} style={{ maxWidth: '100%', minWidth: '100%', maxHeight: '100%', minHeight: '100%' }} onClick={() => {
                  this.setState({
                      selected: {
                          x: j,
                          y: i
                      }
                  });
              }} />;
              return (
                  <div style={{ background: '#fffdd0', border: 'solid ' + (active ? 'red' : 'black') + ' 2px', float: 'left', height: '67.72px', width: '20%' }}>
                      {content}
                  </div>
              );
          });
          return (
              <div style={{ borderCollapse: 'collapse' }}>{grid}</div>
          );
      });
      return (
          <div className="row">
              <div className="col-sm-4">
                  {piezas}
              </div>
              <div className="col-sm-4">
                  {puzzle}
              </div>
              <div className="col-sm-4">
              <img src={'/juegos/'+this.props.filename+'/data/img'+"/dificil/" + this.rompecabezas + "/" + this.rompecabezas + ".png"} style={{ maxWidth: '100%', minWidth: '100%' }} />
              </div>
          </div>
      );
    }
    }
}

export default Main;