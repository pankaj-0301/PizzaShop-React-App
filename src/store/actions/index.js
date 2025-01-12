export const addOrder = (order) => ({ type: 'ADD_ORDER', payload: order });
export const updateOrderStage = (id, stage) => ({ type: 'UPDATE_ORDER_STAGE', payload: { id, stage } });
export const deleteOrder = (id) => ({ type: 'DELETE_ORDER', payload: id });
export const incrementDeliveredCount = () => ({ type: 'INCREMENT_DELIVERED_COUNT' });
export const incrementTime = (id) => ({ type: 'INCREMENT_TIME', payload: { id } });
