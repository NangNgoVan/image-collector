import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button
} from 'react-bootstrap'

export default function SignUp() {
    return(
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="5">
                    <Card>
                        <Card.Body>
                            <Card.Title>Sign Up</Card.Title>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="name" placeholder="Enter your name" />
                                </Form.Group>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formAge">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control type="number" value={20} placeholder="Enter your age" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select defaultValue={"Male"}>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGender">
                                        <Form.Label>Ethnicity</Form.Label>
                                        <Form.Select defaultValue={"Male"}>
                                            <option>Black</option>
                                            <option>White</option>
                                            <option>East Asian</option>
                                            <option>South Asian</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                
                                <Button variant="primary" type="submit">
                                    Sign Up
                                </Button>
                                <Form.Group className="mb-3 text-center" controlId="formBasicPassword">
                                    <Form.Text><a href="/login">Back to login</a></Form.Text>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
