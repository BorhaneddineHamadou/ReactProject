import React, {Component} from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AbouteComponent';
import {connect} from 'react-redux';
import {actions} from 'react-redux-form';
import { addComment, fetchComments, fetchDishes, fetchPromos } from '../redux/ActionCreators';


const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback')),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchComments: () => dispatch(fetchComments())
  });
}


class Main extends Component{
  constructor(props){
    super(props);
  }


  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render(){
    const HomePage=()=>{
        return(
            <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]} 
                  dishesLoading={this.props.dishes.isLoading}
                  dishesErrorMessage={this.props.dishes.errmsg} 
                  promotion={this.props.promotions.promos.filter((promotion)=>promotion.featured)[0]}
                  promosLoading={this.props.promotions.isLoading}
                  promosErrorMessage={this.props.promotions.errmsg} 
                  leader={this.props.leaders.filter((leader)=>leader.featured)[0]} 
            />
        );
    }
    const DishWithId = ({match})=>{
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId, 10))[0]}
                        isLoading={this.props.dishes.isLoading}
                        errorMessage={this.props.dishes.errmsg} 
                        comments={this.props.comments.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId, 10))}
                        addComment={this.props.addComment}
                        commentsErrorMessage={this.props.comments.errmsg} 
            />
        );
    }  
    return (
      <div>
         <Header />
         <Switch>
             <Route path="/home" component={HomePage}/>
             <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
             <Route path="/menu/:dishId" component={DishWithId}/>
             <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}/>
             <Route path="/aboutus" component={()=><About leaders={this.props.leaders} />}/>
             <Redirect to="/home" />
         </Switch>
         <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
