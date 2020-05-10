import React, { Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Label, Col, Row,
         Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import moment from 'moment';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

  constructor(props){
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit(values){
    console.log("Current state is:" + JSON.stringify(values));
    alert("Current state is:" + JSON.stringify(values))
  }

  render(){
    return(
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={ (values) => this.handleSubmit(values)}>
            <Row className="form-group">
                        <Label htmlFor="rating" md={4}>Rating</Label>
                        <Col md={12}>
                        <Control.select model=".rating"
                         name="rating" className = "form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Control.select>
                        </Col>
            </Row>
            <Row className="form-group">
                        <Label htmlFor="yourname" md={4}>Your Name</Label>
                        <Col md={12}>
                            <Control.text model=".yourname" id="yourname" name="yourname"
                                placeholder="Your Name"
                                className="form-control"
                                validators = {{
                                  required, minLength: minLength(2), maxLength: maxLength(15)
                                }} />
                                <Errors
                                className="text-danger"
                                model=".yourname"
                                show="touched"
                                messages = {{
                                  required: 'Required ',
                                  minLength: 'Must be greater than 2 characters ',
                                  maxLength: 'Must be 15 characters or less'
                                }} />
                        </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="feedback" md={4}>Comment</Label>
              <Col md={12}>
                <Control.textarea model=".message" id="message" name="message" rows="6" className="form-control"/>
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{size: 10}}>
                <Button type="submit" color="primary">Submit</Button>
              </Col>
            </Row>

            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }
}


  function RenderComments({comments}){
    const comment = comments.map( (comment) => {
      return (
        <ul class = "list-unstyled" key={comment.id}>
          <li>{comment.comment}</li>
          <br></br>
          <li>-- {comment.author}, {moment(comment.date).format("MMM DD, YYYY")}</li>
        </ul>
      )
    })
    if (comment!= null)
      return(
        <div>
          <Card>
          <CardBody>
            <CardTitle><h4><b>Comments</b></h4></CardTitle>
            <CardText>{comment}</CardText>
            <CommentForm />
          </CardBody>
          </Card>
        </div>

      )
    else {
      return(
          <div></div>
      );
    }
  }

  function RenderDish({dish}){
    if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>

                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
  }

const DishDetail = (props) => {
  return(
    <div className="container">
              <div className="row">
                  <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                  </div>
              </div>
              <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                  </div>
                  <div  className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                  </div>
              </div>
    </div>
  )
}





export default DishDetail;
