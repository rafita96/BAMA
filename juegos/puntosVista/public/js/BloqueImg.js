function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

class BloqueImg extends React.Component{

    constructor(props){
        super(props);


        this.state = {
            imagenes: []
        }
    }

    componentDidMount() {
        this.buildImages();
    }

    buildImages(){
        let imagenes = [];
        for(var i = 0; i < 8; i++){
            imagenes.push(i);
        }

        imagenes = shuffle(imagenes);
        this.setState({
            imagenes: imagenes
        });
    }

    render(){
        var primeraParte = [];
        for(var i = 0; i < 4; i++){
            var grados = this.state.imagenes[i]*45;
            let index = this.state.imagenes[i];

            primeraParte.push(
                <div className="col-3" onClick={() => this.props.seleccionar(index)}>
                    <Img url={"./img/"+this.props.carpeta+"/"+grados+".png"} />
                </div>
            );
        }

        var segundaParte = [];
        for(var i = 4; i < 8; i++){
            var grados = this.state.imagenes[i]*45;
            let index = this.state.imagenes[i];

            segundaParte.push(
                <div className="col-3" onClick={() => this.props.seleccionar(index)}>
                    <Img url={"./img/"+this.props.carpeta+"/"+grados+".png"} />
                </div>
            );
        }

        return(
            <div>
                <div className="row my-1">
                    {primeraParte}
                </div>
                <div className="row my-1">
                    {segundaParte}
                </div>
            </div>
        );
    }
}