const initialState = {
  orders: [],
  deliveredCount: 0,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [
          ...state.orders,
          {
            ...action.payload,
            startTime: Date.now(),
            stageTimeSpent: {
              'Order Placed': 0,
              'Order in Making': 0,
              'Order Ready': 0,
            },
            totalSpent: 0,
            currentStageStartTime: Date.now(),
          },
        ],
      };
    case 'UPDATE_ORDER_STAGE':
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.id === action.payload.id) {
            const timeSpentInCurrentStage = Math.floor(
              (Date.now() - order.currentStageStartTime) / 1000
            );

            return {
              ...order,
              stage: action.payload.stage,
              currentStageStartTime: Date.now(),
              stageTimeSpent: {
                ...order.stageTimeSpent,
                [order.stage]: order.stageTimeSpent[order.stage] + timeSpentInCurrentStage,
              },
              totalSpent:
                order.totalSpent + timeSpentInCurrentStage,
            };
          }
          return order;
        }),
      };
    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    case 'INCREMENT_DELIVERED_COUNT':
      return {
        ...state,
        deliveredCount: state.deliveredCount + 1,
      };
    default:
      return state;
  }
};

export default ordersReducer;
