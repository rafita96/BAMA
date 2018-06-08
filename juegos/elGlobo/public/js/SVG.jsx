class SVG extends React.Component{
    render(){
        return(<svg 
            width={this.props.width} 
            height={this.props.height}>
                <rect width={"100%"} height={"100%"} fill={"#87CEFA"}/>
                {this.props.children}
        </svg>);
    }
}