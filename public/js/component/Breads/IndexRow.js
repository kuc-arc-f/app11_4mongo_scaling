class IndexRow extends React.Component {
    componentDidMount(){
//        console.log(this.props.obj)
    }
    render(){
//console.log(this.props.obj.category[0] )
console.log(this.props.obj.types[0] )
        var category_name = "";
        var type_name = "";
        if(this.props.obj.category.length > 0){
            category_name = this.props.obj.category[0].name ;
        }
        if(this.props.obj.types.length > 0){
            type_name = this.props.obj.types[0].name
        }
        var price_total = this.props.obj.price
        const formatter = new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY'
        });
        price_total = formatter.format(price_total)        
        return (
        <tr>
            <td>
                <a href={"/breads/show/"+ this.props.obj._id}><h3>{this.props.obj.name}</h3>
                </a>
                Category: {category_name}<br />
                Type: {type_name} <br />
                Price :{price_total}<br />
                {this.props.obj.created_at }<br />
            </td>
            <td>
            </td>
        </tr>
        )
    }
}

