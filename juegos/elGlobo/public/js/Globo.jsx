class Globo extends React.Component{

    render(){


        return(
            <circle cx={this.props.cx} cy={this.props.cy} r={this.props.r} fill="red" />
        );
    }
}