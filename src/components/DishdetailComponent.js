import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Row, Col } from 'reactstrap';
import moment from 'moment';

class DishDetail extends Component{

  renderComments(dish){
    const comment = dish.comments.map( (comment) => {
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

  renderDish(dish){
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

  render(){
    return(
      <div className="container">
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                      {this.renderDish(this.props.dish)}
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                      {this.props.dish && this.renderComments(this.props.dish)}
                    </div>
                </div>
      </div>
    )

  }
}

export default DishDetail;
