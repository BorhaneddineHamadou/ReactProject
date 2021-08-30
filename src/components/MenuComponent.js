import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';


function RenderMenuItem(props){
    return(
        <Card>
            <Link to={`/menu/${props.dish.id}`}>
                <CardImg width="100%" src={baseUrl + props.dish.image} alt={props.dish.name} />
                <CardImgOverlay>
                    <CardTitle>{props.dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const Menu = (props) => {
    const menu = props.dishes.dishes.map((dish)=>{
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
               <RenderMenuItem dish={dish}/>
            </div>
        );
    });
    if(props.dishes.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }else if (props.dishes.errmsg){
        return(
            <h4>{props.dishes.errmsg}</h4>
        );
    }else {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                       <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                       <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                       <h3>Menu</h3><hr />
                    </div>
                </div>
                <div className="row">
                     {menu}
                </div>
            </div>
         );
    }
}

export default Menu;