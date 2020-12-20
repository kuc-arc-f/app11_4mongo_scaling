class IndexRow extends React.Component {
    componentDidMount(){
//        console.log(this.props.obj)
    }
    render(){
// console.log(this.props.obj.breads )
        var price_total = this.props.obj.price * parseInt(this.props.obj.order_num);
        const formatter = new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY'
        });
        price_total = formatter.format(price_total)
//        console.log( price_total );
        return (
        <tr>
            <td>
                bread : {this.props.obj.name} <br />
                num: {this.props.obj.order_num } <br />
                Price / JPY: {price_total} <br />
            </td>
            <td>
            </td>
        </tr>
        )
    }
}

