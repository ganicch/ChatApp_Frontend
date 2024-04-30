//Ova komponenta je bila prije registracije i prijavljivanja

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';


function JoinScreen() {

    const socket = io("http://localhost:3001/");
    const navigate = useNavigate();
    const JoinChat = () => {
        const username = `User_${uuidv4().split('-')[0]}`
        socket.emit('join', username);
        navigate(`/home`,{state: {username}})
    }

    return (
        <Form className='form'>
            <H2>Join Chat</H2>
            <FormInput className='form-input'>
                <Button id="join-user" onClick={JoinChat}>Join</Button>
            </FormInput>
        </Form>
    );
}

const Form = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 400px;
    padding: 10px;
    border-bottom: 3px solid #000;
    border-top: 3px solid #000;
`;

const FormInput = styled.div`
    width: 100%;
    margin: 20px 0px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background: #111;
    color: #eee;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    border: none;
`;

const H2 = styled.h2`
    margin-bottom: 10px;
    font-size: 30px;
    color: #111;
    border-bottom: 4px solid #555;
    padding: 5px 0px;
    display: inline-block;
`;

export default JoinScreen;
