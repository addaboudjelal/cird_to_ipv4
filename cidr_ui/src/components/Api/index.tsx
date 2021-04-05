import ApiContext, { withApi} from './context';
import ApiMethod from './Api.logic';

/**
 * @class ApiMethod: provide all the methode to fetch data from Api
 * @class ApiContext | withApi: context and HOC to provide and consume context
 */

export default ApiMethod;
export {ApiContext, withApi};