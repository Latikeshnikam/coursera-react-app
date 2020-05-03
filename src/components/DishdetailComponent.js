import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import moment from 'moment';

  function RenderComments({dish}){
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
                  <div  className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                  </div>
                  <div  className="col-12 col-md-5 m-1">
                    {props.dish && <RenderComments dish = {props.dish} />}
                  </div>
              </div>
    </div>
  )
}

export default DishDetail;
