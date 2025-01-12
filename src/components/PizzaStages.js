import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStage, incrementDeliveredCount } from '../store/actions';

const PizzaStages = () => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const handleNext = (orderId, currentStage) => {
    const stages = ['Order Placed', 'Order in Making', 'Order Ready', 'Order Picked'];
    const nextStage = stages[stages.indexOf(currentStage) + 1];
    if (nextStage) {
      dispatch(updateOrderStage(orderId, nextStage));
    }
  };

  const handlePick = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    console.log(`Order ${orderId} picked. Total time: ${order.totalSpent}s`);
    dispatch(incrementDeliveredCount());
    dispatch(updateOrderStage(orderId, 'Order Picked'));
  };

  return (
    <div className="pizza-stages grid grid-cols-4 gap-4 ">
      {['Order Placed', 'Order in Making', 'Order Ready', 'Order Picked'].map((stage) => (
        <div key={stage} className="bg-gray-500 shadow-md rounded p-4">
          <h2 className="text-lg font-semibold mb-4">{stage}</h2>
          {orders
            .filter((order) => order.stage === stage)
            .map((order) => (
              <div
                key={order.id}
                className={`p-2 mb-2 border text-center  rounded-3xl ${
                  order.stageTimeSpent[stage] >= (stage === 'Order in Making' ? 240 : 180)
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-100'
                }`}
              >
                <p> {order.id}  </p>
                {stage !== 'Order Picked' && (
                  <p>
                     {Math.floor(order.stageTimeSpent[stage] / 60)}m{' '}
                    {order.stageTimeSpent[stage] % 60}s
                  </p>
                )}
                {stage === 'Order Placed' || stage === 'Order in Making' ? (
                  <button
                    onClick={() => handleNext(order.id, stage)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Next
                  </button>
                ) : null}
                {stage === 'Order Ready' && (
                  <button
                    onClick={() => handlePick(order.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Next
                  </button>
                )}
                 {stage == 'Order Picked' && (
                  <p>
                     Picked!
                  </p>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default PizzaStages;
