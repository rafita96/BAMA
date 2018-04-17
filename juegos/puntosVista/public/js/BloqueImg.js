class BloqueImg extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            index: null
        }
        
        this.seleccionar = this.seleccionar.bind(this);
    }

    seleccionar(index){
        this.setState({
            index: index
        });
    }

    render(){
        return(
            <div>
                Caso cuando se muestra la vista aerea y luego quien lo vio.
            </div>
        );
    }
}