import React from 'react';
import { Row, Col } from 'react-bootstrap';

/**
 * 
 * @param: data, loading, error, updateStatus 
 * data list of all the IPs, loading status when fetching and waiting for the result, error, to show the error states that would possibly happend and updateStatus function that would fetch and send the id and the new status of the IP selected
 * @returns : the view of the items (IP) to the main UI
 */

const ListIp = ({ data, loading, error, updateStatus}:any)=> {

        return (<>
            <Col>
                {error && <p className="text-danger">{error}</p>}
            </Col>
            <Col sm={12}>
                <Row>
                    { loading?
                    <Col><p>Loading....</p></Col>:
                    <ItemList items={data} updateStatus={updateStatus} />
                    }

                </Row>
            </Col>
        </>);
}
const ItemList = ({items, updateStatus}:any) => {
    
    return(<>
        { items && items.map((item: any, index: number) => (
        <Col xs={6} sm={4} md={3} xl={2} key={`item-${index}`}>
                <button className="btn btn-light px-4 py-2 m-2 border border-dark" style={{color: item.status?"green":"red"}} type="button" onClick={(e) => { updateStatus(item.id, !item.status); e.preventDefault();}}>
                <p>IP: {item.ip}</p>
                {item.status ? "available" :"acquired"}
            </button>
        </Col>))}
    </>);
}
export default ListIp;