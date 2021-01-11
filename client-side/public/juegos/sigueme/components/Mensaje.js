import React from 'react';

class Mensaje extends React.Component{

    // componentDidMount() {
    //     $("#myModal").modal({
    //         backdrop: 'static',
    //         keyboard: false
    //     });
    //     $("#myModal").modal('show');
    // }
    
    // componentWillUnmount(){
    //     $("#myModal").modal('hide');
    // }

    render(){
        return(
            <div className='border rounded text-center p-4 bg-white'>
                <h1 className="unselectable">{this.props.mensaje}</h1>
            </div>
        );
    }
}

export default Mensaje;