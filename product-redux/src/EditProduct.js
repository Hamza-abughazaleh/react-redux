import React from 'react';
import history from './history';

class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id:'',
            availability:'',
            price_range:'',
            price_tier: '',
            product_name: '',
            unit_cost: '',
            weight: '',
            url: '',
            isEditable: ''
        }
    }
    componentDidMount() {
        let productIndex = this.props.location.state.params.index
        let productDetail = this.props.store.getState()[productIndex]
        this.setState({
            _id: productDetail._id,
            availability: productDetail.availability,
            price_range: productDetail.price_range,
            price_tier:  productDetail.price_tier,
            product_name: productDetail.product_name,
            unit_cost: productDetail.unit_cost,
            weight: productDetail.weight,
            url: productDetail.url,
            isEditable: productDetail.isEditable
        })

    }

    handleChangeRow = (e) => {
        // for a regular input field, read field name and value from the event
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        if (e.target.type === 'checkbox') {
            this.setState({
                [fieldName]: !this.state.isEditable
            })
        } else {
            this.setState({
                [fieldName]: fieldValue
            })
        }
    }

    getOptions = () => {
        if(this.state.price_tier === 'premium') {
            return [<option key='0' value='$50-99'>$50-99</option>,
                    <option key='1' value='$100-199'>$100-199</option>,
                    <option key='2' value='$200+'>$200+</option>]
        } else {
            return [<option key='0' value='$1-10'>$1-10</option>,
                    <option key='1' value='$11-20'>$11-20</option>,
                    <option key='2' value='$20-50'>$20-50</option>]
        }
    }
    checkReadyToSave = () => {
        let ready = true
        Object.keys(this.state).map((key) => {
                var fieldValue = this.state[key];
                if (fieldValue === '' && key !== 'availability'){
                     ready = false
                }
             });
        return ready
    }

    save() {
        this.props.store.dispatch({ type: "UPDATE", index:this.props.location.state.params.index, data: this.state });
        history.push('/')

    }

    render() {
        let options = this.getOptions()
        let readyToSave = this.checkReadyToSave()
        let saveButton = <button disabled={!readyToSave} onClick={() => this.save()}>save</button>
        return (
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>FieldName</th>
                                <th>Type</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td><input type='text' value={this.state.product_name} name='product_name' onChange={this.handleChangeRow}/></td>
                                <td>Required</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td><input type='text' value={this.state.weight} name='weight' onChange={this.handleChangeRow}/></td>
                                <td>Required</td>
                            </tr>
                            <tr>
                                <td>Availability</td>
                                <td><input type='number' value={this.state.availability} name='availability' onChange={this.handleChangeRow}/></td>
                                <td>Optional</td>
                            </tr>
                            <tr>
                                <td>Product Url</td>
                                <td><input type='text' value={this.state.url} name='url' onChange={this.handleChangeRow}/></td>
                                <td>Required</td>
                            </tr>
                            <tr>
                                <td>Price Tier</td>
                                <td>
                                    <input type='radio' checked={this.state.price_tier === 'budget'} value='budget' name='price_tier' onChange={this.handleChangeRow}/> budget
                                    <input type='radio' checked={this.state.price_tier === 'premium'} value='premium' name='price_tier' onChange={this.handleChangeRow}/>premium
                                </td>
                                <td>Required</td>
                            </tr>
                            <tr>
                                <td>Price Range</td>
                                <td>
                                    <select name="price_range" value={this.state.price_range} onChange={this.handleChangeRow}>
                                    {options}
                                </select>
                                </td>
                                <td>Required</td>
                            </tr>
                            <tr>
                                <td>Is Editable</td>
                                <td><input type="checkbox" name="isEditable" value={this.state.isEditable} checked={this.state.isEditable} onChange={this.handleChangeRow} /></td>
                                <td>Required</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    {saveButton}
                </div>
            </div>
        )
    }
}

export default EditProduct;
