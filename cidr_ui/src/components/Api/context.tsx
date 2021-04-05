import { createContext } from 'react'

/**
 * We leavage the power of createContext and HOC to store all the method to fetch the different state from the Rest API
 */
const ApiContext = createContext<any|null>(null);

export const withApi = (Comp:any) => (props:any) => (
    <ApiContext.Consumer>
        { api => <Comp {...props} api={api} />}
    </ApiContext.Consumer>
);

export default ApiContext;