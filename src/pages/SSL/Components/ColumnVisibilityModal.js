import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from 'reactstrap';

const ColumnVisibilityModal = ({ isVisible, toggleModal, visibleColumns, handleCheckboxChange, allColumns }) => {
    return (
        <Modal isOpen={isVisible} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Select Columns</ModalHeader>
            <ModalBody>
                {allColumns.map(columnKey => (
                    <FormGroup check key={columnKey}>
                        <Label check>
                            <Input
                                type="checkbox"
                                name={columnKey}
                                checked={visibleColumns[columnKey]}
                                onChange={handleCheckboxChange}
                            />
                            {columnKey}
                        </Label>
                    </FormGroup>
                ))}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggleModal}>Done</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ColumnVisibilityModal;