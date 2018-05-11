class Mensaje extends React.Component{

    componentDidMount() {
        $("#myModal").modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#myModal").modal('show');
    }
    
    componentWillUnmount(){
        $("#myModal").modal('hide');
    }

    render(){
        return(
            <div id="myModal" className="modal fade" tabindex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <h1 className="unselectable">{this.props.mensaje}</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}