class Hilo extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            desviacion: 0
        }
        
        this.momentum = 5;
        this.animarGlobo = this.animarGlobo.bind(this);

        this.intervalo = setInterval(this.animarGlobo,100);
    }

    componentWillUnmount(){
        clearInterval(this.intervalo);
    }

    animarGlobo(){
        let copia = this.state.desviacion + this.momentum;
        if(copia > 25 || copia < -25){
            this.momentum *= -1;
        }
        this.setState({
            desviacion: copia
        })
    }

    render(){
        this.p1 = {x:this.props.cx+this.state.desviacion, y:this.props.cy+50};
        this.p2 = {x:this.props.cx-this.state.desviacion, y:this.props.cy+75};

        this.pFin = {x:this.props.cx, y:this.props.cy+100};
        return(
            <path d={"M"+this.props.cx+","+this.props.cy+" C"+this.p1.x+","+this.p1.y+" "+this.p2.x+","+this.p2.y+" "+ this.pFin.x + "," + this.pFin.y} 
                    stroke="white" fill="none" stroke-width="3" />
        );
    }
}