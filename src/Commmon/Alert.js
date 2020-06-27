import { Button, Modal } from "react-bootstrap"
import React, { Component } from "react"

export class AlertModify extends React.Component {
  state = {
    show: false,
    body:'',
    title: ''
  }
  constructor() {
    super();
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleShow(title,body) {
    this.setState({ title: title })
    this.setState({ body: body })
    this.setState({ show: true })
  }
  handleClose() {
    this.setState({ show: false })
  }
  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
          </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Delete
          </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  };
}


