`use strict`

//**For debugging**/

const loggerMiddleware = (store:any) => (next:any) => (action:any) => {
  console.warn(store);
  next(action);
}

export default loggerMiddleware;
