import React, { useEffect, useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios'
import './style.css'
import { Navigate } from "react-router-dom";
import { host } from '../Host/host';
import { createSession, verifySession } from '../Session/session';

export default function Index(props) {

  useEffect(() => {
    let session = verifySession();

    if (session === 'empty')
      <Navigate to="/somewhere/else" />

  }, [])

  let [uri, setUri] = useState('');


  let handleChange = (e) => {
    setUri(e.target.value);
    document.getElementById('uri').style.borderColor = ''
    document.getElementById('alert').style.display = 'none'

    document.getElementById('message').innerHTML = ''
  }

  let handleConnect = async () => {
    if (uri === '') {
      document.getElementById('uri').style.borderColor = 'red'
      document.getElementById('alert').style.display = 'block'
      document.getElementById('message').innerHTML = 'This field is required'
    }
    else {
      props.handleLoading(true);
      let myObj = {
        uri: uri
      }
      await axios.post(host + "/connect", myObj)
        .then(async response => {
          console.log(response.data)
          if (await response.data.status == 200) {
            props.handleLoading(false);
            createSession(uri)
          }
          else {
            props.handleLoading(false);
            document.getElementById('uri').style.borderColor = 'red'
            document.getElementById('alert').style.display = 'block'

            document.getElementById('message').innerHTML = "Invalid URI";
          }
        })
    }

  }

  return (
    <div className='Connection'>
      <div className="Box">
        <h2 className='heading'>New Connection</h2>
        <p>Connect to Vendor Part</p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>URI</Form.Label>
            <Form.Control as="textarea" rows={3} name='uri' value={uri} onChange={handleChange} id='uri' />
          </Form.Group>
          <Alert variant={'danger'} id='alert' style={{ display: 'none' }}>
            <span id='message'></span>
          </Alert>
        </Form>
        <Button variant="success" className='btn-connect' onClick={handleConnect}>Connect</Button>
      </div>
    </div >
  )
}
