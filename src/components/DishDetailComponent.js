import React from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';


function RenderDish({dish}){
    if(dish != null){
        return(
         <Card>
             <CardImg src={dish.image} alt={dish.name}/>
             <CardTitle>{dish.name}</CardTitle>
             <CardText>{dish.description}</CardText>
         </Card>
        );
    }else{
        return(<div></div>);
    }
}

function RenderComments({comments}){
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
            </div>
        );
      }else{
          return(<div></div>);
      }
}

const DishDetail = (props) => {
    if (props.dish != null){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.dish.comments}/>
                    </div>
                </div>
            </div>
        )
    }else{
        return (<div></div>);
    }
}

export default DishDetail;