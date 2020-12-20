class IndexRow extends React.Component {
    componentDidMount(){
//        console.log(this.props.obj)
    }
    render(){
//        var book_name = "b1"
        return (
        <tr>
            <td>
                <a href={"/orders/show/"+ this.props.obj._id}><h3>{this.props.obj._id}</h3>
                </a>
                num: {this.props.obj.order_num } ,{this.props.obj.created_at }<br />
                book: {this.props.obj.book.name }<br />
            </td>
            <td>
            </td>
        </tr>
        )
    }
}

