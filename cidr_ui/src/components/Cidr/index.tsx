import React, { Component } from 'react'
import { withApi } from '../Api';
import ListIp from '../ListIp';
import {Row, Col} from 'react-bootstrap';

/**
 * @method componentDidMount: When init the app, this method go fetch the data from the REST API and return all the ips that exist
 * @method onSubmit: When we enter a valid value CIDR that ip is sent to the Rest API where a function generate all the list of possible IPs and send back that list to the UI to update
 * @method onChange: We capture all the variable in the state to use them
 * @method onChecked: We capture all the variable in the state to use them
 * @method updateStatus: Function thta is propagated to the list component where when we click on the button we send the new status of the IP address and the list is sent back the UI with the new updated status
 */

const INIT_STATE = {
    cidr: '',
    mask: '',
    status: true,
    data: [],
    loading: true,
    error: null,
}

class Cidr extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {...INIT_STATE};
    }
    componentDidMount() {
        this.props.api.doList()
            .then((res: any) => {
                this.setState({ loading: true });
                if (res.status === 200) {
                    return res.json();
                } else {
                    new Error('Failed to load IP addresses ' + res);
                }
            })
            .then((data: any) => {
                this.setState({ data: data, loading: false });
            })
            .catch((err: any) => {
                this.setState({ error: "Server Down - "+err });
            });
    }
    onSubmit = (event:any) => {

        const { cidr, mask, status } = this.state;

        this.props.api.doIPaddresses(cidr,status,mask)
            .then((res:any)=>{
                this.setState({ loading: true });
                if(res.status === 200){
                    return res.json();
                }else{
                    new Error('Failed to load IP addresses ' + res);
                }
            })
            .then((data: any) => {
                this.setState({ data: Object.values(data), loading: false, cird:'',mask:'' });
            })
            .catch((err:any)=>{
                this.setState({ error: "Invalid address, out of Range "+err, loading: true });
            });

        event.preventDefault();
    }
    onChange = (event:any) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    onChecked = (event:any) => {
        this.setState({ [event.target.name]: event.target.checked });
    }
    updateStatus = (id: string, status: string) => {
        console.log(id,status);
        this.props.api.doUpdateStatus(id, status)
        .then((res: any) => {
            // this.setState({ loading: true });
            if (res.status === 200) {
                return res.json();
            } else {
                new Error('Failed to Update IP address ' + res);
            }
        })
        .then((data: any) => {
            this.setState({ data: data, loading: false });
        })
        .catch((err: any) => {
            this.setState({ error: "Invalid status "+ err, loading: true})
        });
    }

    render() {
        const { cidr, mask, data, loading, error } = this.state;
        const inInvalid = !( (mask >= 22 && mask <= 32) ) ;
        return (<>
            <Row>
                <Col>
                    <form className="row p-2" onSubmit={this.onSubmit}>
                        <Col xs={12} md={6}>
                            <label className="form-label mt-2">CIDR Block</label>
                            <input className="form-control form-control-sm" type="text" name="cidr" value={cidr} onChange={this.onChange} placeholder="Enter a valid IP xxx.xxx.xxx.xxx" pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}$"/>
                        </Col>
                        <Col xs={12} md={6}>
                            <label className="form-label mt-2">CIDR Range</label>
                            <input className="form-control form-control-sm" type="number" name="mask" value={mask} onChange={this.onChange} placeholder="Enter a valid Range between 22 and 32" min="22" max="32" pattern="^([22-32]$"/>
                        </Col>
                        <Col sm={12}>
                            <button className="btn btn-primary my-3" type="submit" disabled={inInvalid} >List addresses</button>
                        </Col>
                    </form>
                </Col>
            </Row>
            <Row>
                <ListIp updateStatus={this.updateStatus} data={data} loading={loading} error={error} />
            </Row>
            
        </>);

    }
}

export default withApi(Cidr);