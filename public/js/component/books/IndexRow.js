class IndexRow extends React.Component {
    componentDidMount(){
//        console.log(this.props.obj)
    }
    render(){
        return (
        <tr>
            <td>
                {this.props.obj.id}
            </td>
            <td>
                <a href={"/books/show/"+ this.props.obj.id}>{this.props.obj.title}
                </a>
                <a href={"/books/edit/"+ this.props.obj.id}> [ edit ]
                </a>
                <br />
                category_name : {this.props.obj.category_name}
            </td>
        </tr>
        )
    }
}

