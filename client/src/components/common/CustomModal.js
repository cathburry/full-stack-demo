import React from 'react';
import {
  Row,
  Col,
  Modal,
  Card,
  Button,
} from 'react-bootstrap';

const CustomModal = ({
  handleClose,
  show,
  size,
  modalHeading,
  children,
  handleLeftAction,
  handleRightAction,
  leftButtonLabel,
  rightButtonLabel,
}) => {
  return (
    <>
      <Modal
        show={show}
        size={size}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {
          leftButtonLabel || rightButtonLabel && (
            <Modal.Footer>
              {
                leftButtonLabel && (
                  <Button variant="secondary" onClick={handleLeftAction}>
                    {leftButtonLabel}
                  </Button>
                )
              }
              {
                rightButtonLabel && (
                  <Button variant="primary" onClick={handleRightAction}>
                    {rightButtonLabel}
                  </Button>
                )
              }
            </Modal.Footer>
          )
        }
        </Modal>
    </>
  );
}

export default CustomModal;
