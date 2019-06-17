import React from "react";
import { Modal, ButtonToolbar, Button } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import "./css/main.scss"; // webpack must be configured to do this
// import ReactHtmlParser, {
//   processNodes,
//   convertNodeToElement,
//   htmlparser2
// } from "react-html-parser";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show
    };
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.show !== this.state.show) {
      this.setState({ show: nextProps.show });
    }
  }

  handleClose = async () => {
    await this.setState({ show: false });
  };

  handleShow = async () => {
    await this.setState({ show: true });
  };

  render() {
    return (
      <ButtonToolbar>
        <Modal
          size="lg"
          show={this.state.show}
          onHide={this.handleClose}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header
            closeButton
            style={
              this.props.color != "black" && this.props.color != ""
                ? {
                    backgroundColor: this.props.color,
                    color: "white",
                    textTransform: "capitalize",
                    fontWeight: 800
                  }
                : {
                    backgroundColor: "white",
                    color: "black",
                    textTransform: "capitalize",
                    fontWeight: 800
                  }
            }
          >
            <Modal.Title id="event-header">
              <i className="fa fa-calendar"> </i>&nbsp;{this.props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {ReactHtmlParser(this.props.description)}
            <br />

            <span class="badge badge-secondary">
              {" "}
              <i className="fa fa-link"> </i> &nbsp;
              {this.props.event_url}
            </span>
          </Modal.Body>
          <Modal.Footer>
            <a
              href={this.props.event_url}
              target="_blank"
              id="event-link"
              className="btn btn-primary btn-lg btn-block"
              style={
                this.props.color != "black" && this.props.color != ""
                  ? {
                      backgroundColor: this.props.color,
                      color: "white",
                      borderColor: this.props.color
                    }
                  : {}
              }
            >
              <i className="fa fa-external-link"> </i> &nbsp;Ir pro site do
              evento
            </a>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    );
  }
}
export default Event;
