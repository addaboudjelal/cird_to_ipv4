import { createContext } from 'react'


const ApiContext = createContext<any|null>(null);

export const withApi = (Comp:any) => (props:any) => (
    <ApiContext.Consumer>
        { api => <Comp {...props} api={api} />}
    </ApiContext.Consumer>
);

export default ApiContext;