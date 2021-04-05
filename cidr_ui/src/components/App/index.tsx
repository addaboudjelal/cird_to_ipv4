import React from 'react'
import Cidr from '../Cidr';
import { Container, Row, Col} from 'react-bootstrap';
const App = () => {

    return(<>
        <Container>
            <Row>
                <Col></Col>
                <Col sm={6}>
                    <h1 className="p-4">CIDR to IPv4 Conversion</h1>
                </Col>
                <Col></Col>
            </Row>
            <Cidr />
        </Container>
    </>);
}

export default App;