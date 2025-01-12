import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, incrementDeliveredCount } from '../store/actions';

const MainSection = () => {
  const orders = useSelector((state) => state.orders.orders);
  const deliveredCount = useSelector((state) => state.orders.deliveredCount);
  const dispatch = useDispatch();

  const handleCancel = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (order.stage === 'Order Ready' || order.stage === 'Order Picked') return; 
    dispatch(deleteOrder(orderId));
  };

  const handlePicked = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    const totalTime = Math.floor((Date.now() - order.startTime) / 1000); 
    console.log(`Order ${orderId} picked. Total time: ${totalTime}s`);
    dispatch(incrementDeliveredCount());
    dispatch(deleteOrder(orderId));
  };

  return (
    <div className="main-section bg-gray-400 shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Main Section</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Stage</th>
            <th className="px-4 py-2">Total Time Spent</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="text-center">
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.stage}</td>
              <td className="border px-4 py-2">
                {Math.floor(order.totalSpent / 60)}m {order.totalSpent % 60}s
              </td>
              <td className="border px-4 py-2">
                {order.stage !== 'Order Ready' && order.stage !== 'Order Picked' && (
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 font-bold">Total Delivered: {deliveredCount}</p>
    </div>
  );
};

export default MainSection;
