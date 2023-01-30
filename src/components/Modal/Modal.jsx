import './Modal.css'
import { Form, Button } from 'react-bootstrap'
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const EditModal = ({ show, handleClose, description, handleModalChange, handleModalSubmit, children, title }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Form onSubmit={handleModalSubmit}>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>{children}</Form.Label>
                            <Form.Control type="text" value={description} onChange={handleModalChange} name="description" required />
                        </Form.Group>

                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className='ms-3' variant="light" type="submit" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditModal