import Img from '../../../../public/common/js/juegos/compiled/Img.jsx';

class Ejercicio extends React.Component{
    render(){
        return(<div className="row">
            <div className="col-6">
            <Img url="./../../../../public/common/img/puntosVista/1/1/0.png" />
            </div>

            <div className="col-6">
                <svg viewBox="0 0 100 60">
                    <image y="4" 
                        width="100" height="50" 
                        href="./../../../../public/common/img/puntosVista/1/1/aereo.png" />
                    <circle fill="red" cx={23} cy={4} r={2} />
                    <circle fill="red" cx={50} cy={4} r={2} />
                    <circle fill="red" cx={77} cy={4} r={2} />

                    <circle fill="red" cx={23} cy={29} r={2} />
                    <circle fill="red" cx={77} cy={29} r={2} />

                    <circle fill="red" cx={23} cy={54} r={2} />
                    <circle fill="red" cx={50} cy={54} r={2} />
                    <circle fill="red" cx={77} cy={54} r={2} />
                </svg>
            </div>
        </div>);
    }
}

export default Ejercicio;