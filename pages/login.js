import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button
} from 'react-bootstrap'

export default function Login() {
    return(
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Login</Card.Title>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                                <Form.Group className="mb-3 text-center" controlId="formBasicPassword">
                                    <Form.Text>Don't have account? <a href="/signup">Sign up</a></Form.Text>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}