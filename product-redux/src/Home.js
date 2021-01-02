import React from 'react';
import './App.css';
import Product from './product';

function Home(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>weight</th>
                    <th>availability</th>
                </tr>
            </thead>
            <tbody>
                {props.store.getState().map((row, index) =>
                    <Product row={row} key={row._id} index={index}/>
                )}
            </tbody>
        </table>
    );
}

export default Home;
