import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button
} from 'react-bootstrap'

export default function Home() {
  return (
    <Container>
      <Row className="justify-content-center text-center">
        <h1>Image Collecting Program</h1>
        <Col xs lg="3">
          <Link href="/me/upload">
            <Button>Upload your images</Button>
          </Link> 
        </Col>
        
        <span>If you uploaded your images? Click <Link href="/me"><a>here</a></Link> to check!</span>
      </Row>
    </Container>
  )
}
