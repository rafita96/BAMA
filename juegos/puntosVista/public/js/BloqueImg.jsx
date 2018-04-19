import Img from './Img.jsx';

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i >= 0; i--) {
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

        return(
            <div>
                <div className="row my-1">
                    <div className="col-3 my-1" onClick={() => this.props.seleccionar(0)}>
                        <Img url={"./img/"+this.props.carpeta+"/0.png"} />
                    </div>
                    <div className="col-3 my-1" onClick={() => this.props.seleccionar(1)}>
                        <Img url={"./img/"+this.props.carpeta+"/45.png"} />
                    </div>
                    <div className="col-3 my-1" onClick={() => this.props.seleccionar(2)}>
                        <Img url={"./img/"+this.props.carpeta+"/90.png"} />
                    </div>
                    <div className="col-3 my-1" onClick={() => this.props.seleccionar(3)}>
                        <Img url={"./img/"+this.props.carpeta+"/135.png"} />
                    </div>
                    <div className="col-3 my-1" onClick={() => this.props.seleccionar(4)}>
                        <Img url={"./img/"+this.props.carpeta+"/180.png"} />
                    </div>
                    <div className="col-3 my-1" onClick={() => this.props.seleccionar(5)}>
                        <Img url={"./img/"+this.props.carpeta+"/225.png"} />
                    </div>
                    <div className="col-3 my-1" onClick={() => this.props.seleccionar(6)}>
                        <Img url={"./img/"+this.props.carpeta+"/270.png"} />
                    </div>
                    <div className="col-3 my-1" onClick={() => this.props.seleccionar(7)}>
                        <Img url={"./img/"+this.props.carpeta+"/315.png"} />
                    </div>
                </div>
            </div>
        );
    }
}

export default BloqueImg;