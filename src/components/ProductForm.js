import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const { auth } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/products', 
            { name, description, price },
            { headers: { Authorization: `Bearer ${auth.token}` } }
            );
            alert('Product added successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to add product!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Product Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default ProductForm;
