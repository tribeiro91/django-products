import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
    super(props);
    this.state = {
        activeItem: this.props.activeItem
    };
    }
    handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
        value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
    };
    render() {
    const { toggle, onSave } = this.props;
    return (
        <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Produto </ModalHeader>
        <ModalBody>
            <Form>
            <FormGroup>
                <Label for="title">Nome</Label>
                <Input
                type="text"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Insira o nome do produto"
                />
            </FormGroup>
            <FormGroup>
                <Label for="description">Descrição</Label>
                <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Insira a descrição do produto"
                />
            </FormGroup>
            <FormGroup check>
                <Label for="price">Price</Label>
                <Input
                type="text"
                name="price"
                value={this.state.activeItem.price}
                onChange={this.handleChange}
                placeholder="Insira o valor do produto"
                />
            </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Salvar
            </Button>
        </ModalFooter>
        </Modal>
    );
    }
}