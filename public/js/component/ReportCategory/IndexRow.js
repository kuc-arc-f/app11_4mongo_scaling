class IndexRow extends React.Component {
    componentDidMount(){
//        console.log(this.props.obj)
    }
    render(){
console.log(this.props.obj.price_total )
//        var price_total = this.props.obj.price * parseInt(this.props.obj.order_num);
        var price_total = this.props.obj.price_total
        const formatter = new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY'
        });
        price_total = formatter.format(price_total)        
        return (
        <tr>
            <td>
                bread : {this.props.obj.name} <br />
                Price /JPY: {price_total} <br />
            </td>
            <td>
            </td>
        </tr>
        )
    }
}

