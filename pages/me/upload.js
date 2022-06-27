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
        email: '',
        gender: 'male',
        ethnicity: 'black',
        enrollmentImage: '',
        historicalImages: ''
    })

    const [confirmed, setConfirmed] = useState(false)

    const handleUserPropChange = function(e) {
        setUser({...user,[e.target.name]: e.target.value})
    }

    const handleUserEnrollmentImageChange = function(e) {
        setUser({...user, [e.target.name]: e.target.files[0] })
    }

    const handleHistoricalImagesChange = function(e) {
        setUser({...user, [e.target.name]: e.target.files})
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
            
            // console.log(user)

            for (const key in user) {
                formData.append(key, user[key])
            }

            fetch('/api/data', {
                method: 'post',
                mode: 'cors',
                cache: 'no-cache',
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                // },
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
                                            <Form.Select 
                                                
                                                name="gender"
                                                value={user.gender}
                                                onChange={(e)=>handleUserPropChange(e)}>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formEthnicity">
                                            <Form.Label>Ethnicity</Form.Label>
                                            <Form.Select 
                                                
                                                name="ethnicity"
                                                value={user.ethnicity}
                                                onChange={(e)=>handleUserPropChange(e)}>
                                                <option value="black">Black</option>
                                                <option value="white">White</option>
                                                <option value="east_asian">East Asian</option>
                                                <option value="south_asian">South Asian</option>
                                            </Form.Select>
                                         </Form.Group>
                                    </Row>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control 
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            placeholder="Enter email" 
                                            onChange={(e)=>handleUserPropChange(e)}/>
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
                                        <Form.Check 
                                            type="checkbox"
                                            checked={confirmed}
                                            onChange={()=>setConfirmed(!confirmed)} 
                                            label="I confirm to allow the company to use my data for AI data training purpose of this project"/>
                                    </Form.Group>
                                    {
                                    !confirmed?null:
                                        <Form.Group>
                                            CEF form
                                        </Form.Group>
                                    }
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
                                    {
                                        user.enrollmentImage?<img 
                                            style={{width: '100%', height: 'auto'}}
                                            src={URL.createObjectURL(user.enrollmentImage)}/>:null
                                    }
                                    <Form.Group>
                                        <Form.Label>
                                            Choose your Historical images
                                        </Form.Label>
                                        <Form.Control 
                                            type="file"
                                            name="historicalImages"
                                            onChange={handleHistoricalImagesChange}
                                            multiple/>
                                        <Form.Text>It must be original images</Form.Text>
                                    </Form.Group>
                                    {
                                        user.historicalImages?[...user.historicalImages].map(file=>
                                            <img key={file.name}
                                            style={{width: '100%', height: 'auto'}}
                                            src={URL.createObjectURL(file)}/>):null
                                    }
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
                    <Button onClick={nextStepHandler} style={{width:'100%'}} disabled={!confirmed}>
                        {(activeStepIndex != steps.length-1)?'Next step':'Submit'}
                    </Button>
                    </Col>
            </Row>
            </Row>
        </Container>
    )
}