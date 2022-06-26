import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button
} from 'react-bootstrap'

import { useRef, useState } from 'react'

import Stepper, { Step, 
    Content as StepperContent,
    Tab as StepperTab
} from '../../components/Stepper'

import Router from 'next/router'

const steps = [
    {id: 'info_login', label: 'Input your infomation'},
    {id: 'upload_image', label: 'Upload your images'},
    {id: 'submit', label: 'Submit'}
]

export default function() {

    const [user, setUser] = useState({
        name: '',
        age: 20,
        enrollmentImage: '',
        historicalImage: ''
    })

    const handleUserPropChange = function(e) {
        setUser({...user,[e.target.name]: e.target.value})
    }

    const handleUserEnrollmentImageChange = function(e) {
        setUser({...user, [e.target.name]: e.target.files[0] })
    }

    const [activeStepIndex, setActiveStepIndex] = useState(0)
    const nextStepHandler = function() {
        //
        let nextStepIndex = activeStepIndex + 1;
        if (nextStepIndex < steps.length)
            setActiveStepIndex(nextStepIndex)
        else {
            // submit data...
            var formData = new FormData()

            console.log(user);

            fetch('/api/image', {
                method: 'post',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if (data.success) {
                    // Router.push('/me/');
                }
                // fail
                else {

                }
            })
        }
    }

    const backStepHandler = function() {
        let prevStepIndex = activeStepIndex - 1;
        if (prevStepIndex >= 0) {
            setActiveStepIndex(prevStepIndex)
        }
    }

    return(
        <Container>
            <Row className="text-center">
                <h1>Upload Your Images</h1>
                <small>Please follow the steps as below</small>
            </Row>
            <br/>
            <Stepper activeStepIndex={activeStepIndex} 
                onStepIndexChanged={(index, stepId)=>setActiveStepIndex(index)}>
                    {
                        steps.map(step=><Step key={step.id} id={step.id}>{step.label}</Step>)
                    }
            </Stepper>
            <Row>
            <Row style={{padding: '1rem'}}>
            <StepperContent activeStepIndex={activeStepIndex}>
                <StepperTab forIndex={0}>
                    <Card>
                        <Card.Body>
                        <Form id="infoForm">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" 
                                placeholder="Enter your name"
                                value={user.name}
                                name="name"
                                onChange={(e)=>handleUserPropChange(e)} />
                            </Form.Group>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formAge">
                                            <Form.Label>Age</Form.Label>
                                            <Form.Control 
                                                type="number"
                                                name="age"
                                                value={user.age}
                                                onChange={(e)=>handleUserPropChange(e)}
                                                placeholder="Enter your age" />
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
                                    <Form.Group className="mb-3">
                                        <Form.Label>Payment method</Form.Label>
                                        <Form.Control type="text" placeholder="Input your payment number"></Form.Control>
                                        <Form.Text>
                                            Please check your payment carefully!
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Check type="checkbox" label="I confirm to allow the company to use my data for AI data training purpose of this project"/>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                    </Card>
                </StepperTab>
                <StepperTab forIndex={1}>
                    <Row>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>
                                            Choose your Enrollment image
                                        </Form.Label>
                                        <Form.Control 
                                            type="file"
                                            name="enrollmentImage"
                                            onChange={handleUserEnrollmentImageChange}/>
                                        <Form.Text>Resolution: 1920x1080</Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Choose your Historical images
                                        </Form.Label>
                                        <Form.Control type="file" multiple/>
                                        <Form.Text>It must be original images</Form.Text>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Row>
                    
                </StepperTab>
                <StepperTab forIndex={2}>
                        <Card>
                            <Card.Body>
                                Almost done! Submit your data.
                            </Card.Body>
                        </Card>
                </StepperTab>
            </StepperContent>
            </Row>
            <Row className="justify-content-center">
                   {
                       activeStepIndex!=0?<Col xs lg="2">
                       <Button
                            variant="danger" 
                            onClick={backStepHandler} style={{width:'100%'}}>
                            Back
                        </Button>
                       </Col>:null
                   }
                    <Col xs lg="2">
                    <Button onClick={nextStepHandler} style={{width:'100%'}}>
                        {(activeStepIndex != steps.length-1)?'Next step':'Submit'}
                    </Button>
                    </Col>
            </Row>
            </Row>
        </Container>
    )
}