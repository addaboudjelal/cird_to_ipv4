
const config = {
    apiUrl: "http://localhost:5000/ipv4",
}

/**
 * @method doList: get list of all ips
 * @method doUpdateStatus: put/update ip status
 * TODO:
 * @method doCreate: create a list of ip CIRD block
 */

class ApiMethod {
    
    doList = () => fetch(`${config.apiUrl}`);
    
    doUpdateStatus = (id:string, status: string) => fetch(`${config.apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id,status}),
    });

    doIPaddresses = (ip: string, status: string, mask:number) => fetch(`${ config.apiUrl}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip, status, mask }),
    });

}

export default ApiMethod;