import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

const EditModal = ({ show, handleClose, description, handleDescriptionChange, handleEditSubmit }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit your comment</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={description} onChange={handleDescriptionChange} name="description" required />
                        </Form.Group>

                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditModal