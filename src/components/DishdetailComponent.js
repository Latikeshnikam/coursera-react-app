import React, { Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Label, Col, Row,
         Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loading from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

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
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.message);
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
                        <Label htmlFor="author" md={4}>Your Name</Label>
                        <Col md={12}>
                            <Control.text model=".author" id="author" name="author"
                                placeholder="Your Name"
                                className="form-control"
                                validators = {{
                                  required, minLength: minLength(2), maxLength: maxLength(15)
                                }} />
                                <Errors
                                className="text-danger"
                                model=".author"
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


  function RenderComments({comments, postComment, dishId}){
    const comment =
    <Stagger in>{
      comments.map( (comment) => {
        return (
          <Fade in>
          <ul className= "list-unstyled" key={comment.id}>
            <li>{comment.comment}</li>
            <br></br>
            <li>-- {comment.author}, {moment(comment.date).format("MMM DD, YYYY")}</li>
          </ul>
          </Fade>
        )
      })}
    </Stagger>

    if (comment!= null)
      return(
        <div>
          <Card>
          <CardBody>
            <CardTitle><h4><b>Comments</b></h4></CardTitle>
            <CardText>{comment}</CardText>
            <CommentForm dishId = {dishId} postComment = {postComment} />
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
          <FadeTransform
              in
              transformProps={{
                  exitTransform: 'scale(0.5) translateY(-50%)'
              }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
          </FadeTransform>
        );
    else
        return(
            <div></div>
        );
  }

const DishDetail = (props) => {
    if(props.isLoading){
      return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    }
    else if (props.errMess) {
      return(
        <div className="container">
          <div className="row">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      );
    }
    else if (props.dish!=null){
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
                        <RenderComments comments={props.comments}
                        postComment = {props.postComment}
                        dishId = {props.dish.id} />
                      </div>
                  </div>
        </div>
      );
    }
    else{
      return(
        <div></div>
      )
    }
}





export default DishDetail;
