import React from 'react';
import './App.css';
import {Link} from "react-router-dom";

function Product(props) {
    let editButton;
    if(props.row.isEditable){
        editButton = <Link to={{pathname: 'edit_product',state: { params: {index: props.index}}}}>Edit</Link>
    } else {
        editButton = ''
    }
    return (
        <tr>
            <td>{props.row.product_name}</td>
            <td>{props.row.weight}</td>
            <td>{editButton}</td>
        </tr>
    );
}

export default Product;
