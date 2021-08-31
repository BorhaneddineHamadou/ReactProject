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
import { postComment, fetchComments, fetchDishes, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


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
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback')),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
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
    this.props.fetchLeaders();
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
                  leader={this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
                  leadersLoading={this.props.leaders.isLoading}
                  leadersErrorMessaage={this.props.leaders.errmsg} 
            />
        );
    }
    const DishWithId = ({match})=>{
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId, 10))[0]}
                        isLoading={this.props.dishes.isLoading}
                        errorMessage={this.props.dishes.errmsg} 
                        comments={this.props.comments.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId, 10))}
                        postComment={this.props.postComment}
                        commentsErrorMessage={this.props.comments.errmsg} 
            />
        );
    }  
    return (
      <div>
         <Header />
         <TransitionGroup>
           <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
                  <Route path="/home" component={HomePage}/>
                  <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
                  <Route path="/menu/:dishId" component={DishWithId}/>
                  <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                  <Route path="/aboutus" component={()=><About leaders={this.props.leaders} />}/>
                  <Redirect to="/home" />
              </Switch>
           </CSSTransition>
         </TransitionGroup>
         <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
