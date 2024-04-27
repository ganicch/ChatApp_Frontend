import React from 'react';
import styled from 'styled-components';

function JoinScreen() {
    return (
        <Form className='form'>
            <H2>Join Chat</H2>
            <FormInput className='form-input'>
                <Label>Username </Label>
                <Input type='text' id="username" />
            </FormInput>
            <FormInput className='form-input'>
                <Button id="join-user">Join</Button>
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
`;

const FormInput = styled.div`
    width: 100%;
    margin: 20px 0px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #555;
    font-size: 16px;
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
    margin-bottom: 20px;
    font-size: 30px;
    color: #111;
    border-bottom: 4px solid #555;
    padding: 5px 0px;
    display: inline-block;
`;

export default JoinScreen;
