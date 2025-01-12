import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PizzaForm from './components/PizzaForm';
import PizzaStages from './components/PizzaStages';
import MainSection from './components/MainSection';
import { updateOrderStage } from './store/actions'; 

const App = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    const timer = setInterval(() => {
      orders.forEach((order) => {
        if (order.stage !== 'Picked') {
          dispatch(updateOrderStage(order.id, order.stage));
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orders, dispatch]);

  return (
    <div className="app bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-6">PIZZA SHOP</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-1 bg-gray-300 p-4 shadow rounded-md">
          <PizzaForm />
        </div>

        <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
          <div className="bg-gray-300 p-4 shadow rounded-md">
            <PizzaStages />
          </div>
          <div className="bg-gray-300 p-4 shadow rounded-md">
            <MainSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
