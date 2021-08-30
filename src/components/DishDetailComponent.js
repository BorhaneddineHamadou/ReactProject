import React, {Component} from 'react';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, BreadcrumbItem, Card, CardImg, CardText, CardTitle, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';


const required = (value) => value && value.length;
const minLength = (len) => (value) => !(value) || value.length >= len;
const maxLength = (len) => (value) => !(value) || value.length <= len;

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state={
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <>
                <Button type="button" outline onClick={this.toggleModal}>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle = {this.toggleModal}>
                     <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>   
                     <ModalBody>
                         <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                              <Row className={"mb-3 form-group"}>
                                  <Label htmlFor="rating">Rating</Label>
                                  <Col>
                                    <Control.select className="form-control" model=".rating" name="rating" id="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                  </Col>
                              </Row>
                              <Row className={"mb-3 form-group"}>
                                  <Label htmlFor="author">Your Name</Label>
                                  <Col>
                                      <Control.text model=".author" className="form-control" name="author" id="author" 
                                      placeholder="Your Name"
                                      validators={{
                                          required,
                                          minLength: minLength(3),
                                          maxLength: maxLength(15)
                                      }} />
                                      <Errors model=".author" className="text-danger" show="touched"
                                      messages={{
                                          required: "Required",
                                          minLength: "Must be greater than 3 characters",
                                          maxLength: "Must be 15 characters or less"
                                      }} />
                                  </Col>
                              </Row>
                              <Row className={"mb-3 form-group"}>
                                  <Label htmlFor="comment">Comment</Label>
                                  <Col>
                                       <Control.textarea className="form-control" rows="6" model=".comment" name="comment" id="comment" />
                                  </Col>
                              </Row>
                              <Button type="submit" value="submit" color="primary">Submit</Button>
                         </LocalForm>
                     </ModalBody>
                </Modal>
            </>
        );
    }
}

function RenderDish({dish}){
    if(dish != null){
        return(
         <Card>
             <CardImg src={baseUrl + dish.image} alt={dish.name}/>
             <CardTitle>{dish.name}</CardTitle>
             <CardText>{dish.description}</CardText>
         </Card>
        );
    }else{
        return(<div></div>);
    }
}

function RenderComments({comments, addComment, dishId}){
    if(comments != null){
        const commentsMenu = comments.map((comment)=>{
           return (
               <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>-- {comment.author} , {comment.date}</p>
               </li>
           );
        });  
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                   {commentsMenu}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
      }else{
          return(<div></div>);
      }
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
    }else if(props.errorMessage){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errorMessage}</h4>
                </div>
            </div>
        );
    } else
    if (props.dish != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                    <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                                        dishId={props.dish.id}
                                        addComment={props.addComment} />
                    </div>
                </div>
            </div>
        )
    }else{
        return (<div></div>);
    }
}

export default DishDetail;