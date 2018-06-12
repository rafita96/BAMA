class Hilo extends React.Component{

    render(){
        this.p1 = {x:this.props.cx+this.props.desviacion, y:this.props.cy+50};
        this.p2 = {x:this.props.cx-this.props.desviacion, y:this.props.cy+75};

        this.pFin = {x:this.props.cx, y:this.props.cy+100};
        return(
            <path d={"M"+this.props.cx+","+this.props.cy+" C"+this.p1.x+","+this.p1.y+" "+this.p2.x+","+this.p2.y+" "+ this.pFin.x + "," + this.pFin.y} 
                    stroke="white" fill="none" stroke-width="3" />
        );
    }
}

export default Hilo;