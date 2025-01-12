import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../store/actions';

const PizzaForm = () => {
  const [type, setType] = useState('Veg');
  const [size, setSize] = useState('Small');
  const [base, setBase] = useState('Thin');
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orders.length >= 10) {
      alert('Not taking any order for now');
      return;
    }
    const newOrder = {
      id: `Order ${orders.length + 1}`,
      type,
      size,
      base,
      stage: 'Order Placed',
      timeSpent: 0,
    };
    dispatch(addOrder(newOrder));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-500 shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Place Your Order</h2>
      <label className="block mb-2">
        Type:
        <select 
          className="block w-full border rounded p-2 mt-1" 
          value={type} 
          onChange={(e) => setType(e.target.value)}>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </label>
      <label className="block mb-2">
        Size:
        <select 
          className="block w-full border rounded p-2 mt-1" 
          value={size} 
          onChange={(e) => setSize(e.target.value)}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </label>
      <label className="block mb-2">
        Base:
        <select 
          className="block w-full border rounded p-2 mt-1" 
          value={base} 
          onChange={(e) => setBase(e.target.value)}>
          <option value="Thin">Thin</option>
          <option value="Thick">Thick</option>
        </select>
      </label>
      <button 
        type="submit" 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Order Pizza
      </button>
    </form>
  );
};

export default PizzaForm;

