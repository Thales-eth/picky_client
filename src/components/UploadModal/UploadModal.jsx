import React from 'react'
import { Form, Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

const UploadModal = ({ show, handleClose, handleFileInput, handleModalChange, title, canClick, setCanClick }) => {
    return (
        <>
            <Modal show={show} onHide={() => {
                handleClose()
                setCanClick(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Form onSubmit={handleFileInput}>
                        <Form.Group className="mb-3" controlId="avatar">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type="file" onChange={handleModalChange} name="photo" />
                        </Form.Group>

                        <Button variant="danger" onClick={() => {
                            handleClose()
                            setCanClick(false)
                        }}>
                            Close
                        </Button>
                        {
                            canClick &&
                            <Button className='ms-1' variant="primary" type="submit" onClick={handleClose}>
                                Save Changes
                            </Button>
                        }
                    </Form>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UploadModal