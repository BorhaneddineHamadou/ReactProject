import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) =>{
    return({
        type: ActionTypes.ADD_COMMENT,
        payload: comment
    });
}

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + "comments", {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'same-origin'
    }).then(response => {
        if(response.ok) {
            return response;
        }else{
            var error = new Error("Error " + response.status + " : " + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmsg = new Error(error.message);
        throw errmsg;
    })  
    .then(response => response.json())
    .then(comment => dispatch(addComment(comment)))
    .catch(error => {
        console.log('Post Comments ', error.message);
        alert('Your comment could not be posted\nError '+error.message);
    });
}


export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
    const newFeedback = {
        firstname : firstname,
        lastname : lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    }

    newFeedback.date = new Date().toISOString();
    return fetch(baseUrl+'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response; 
        }else{
            var error = new Error('Error ' + error.status + ' : ' + error.statusText);
            error.response = response;
            throw  error;
        }
        
    }, error => {
        var errmsg = new Error(error.message);
        throw errmsg;
    })
    .then(response => response.json())
    .then(feedback => {
        alert('Thank you for yout feedback!\n' + JSON.stringify(feedback));
    })
    .catch(error => {
        alert('Your feedback could not be posted\n' + error.message)
    })
}
export const fetchDishes = () => (dispatch) =>{
    dispatch(dishesLoading());
    
    return fetch (baseUrl + 'dishes')
            .then(response => {
                if(response.ok) {
                    return response;
                }else{
                    var error = new Error("Error " + response.status + " : " + response.statusText);
                    error.response = response;
                    throw error;
                }
            }, error => {
                var errmsg = new Error(error.message);
                throw errmsg;
            })  
            .then(response => response.json())
            .then(dishes => dispatch(addDishes(dishes)))
            .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => {
    return (
        {
           type: ActionTypes.DISHES_LOADING
        }
    );
}

export const dishesFailed = (errmsg) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmsg
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl+'comments')
           .then(response => {
               if(response.ok){
                   return response;
               }else{
                   var error = new error('Error ' + response.status + ' : ' + response.statusText);
                   error.response = response;
                   throw error;
               }
           }, error => {
               var errmsg = new Error(error.message);
               throw errmsg;
           })  
           .then(response => response.json())
           .then(comments => dispatch(addComments(comments)))
           .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmsg) => ({
   type: ActionTypes.COMMENTS_FAILED,
   payload: errmsg
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());

    fetch(baseUrl+'promotions')
          .then(response => {
              if(response.ok){
                  return response;
              }else{
                  var error = new Error("Error " + response.status + " : " + response.statusText);
                  error.response = response;
                  throw error;
              }
          }, error => {
              var errmsg = new Error(error.message);
              throw errmsg;
          }) 
          .then(response => response.json())
          .then(promos => dispatch(addPromos(promos)))
          .catch(error => dispatch(promosFailed(error.message)));
}

export const promosFailed = (errmsg) => ({
   type: ActionTypes.PROMOS_FAILED,
   payload: errmsg
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
           .then(response => {
               if(response.ok){
                   return response;
               }else{
                   var error = new Error('Error ' + response.status + ' : ' + response.statusText);
                   error.response = response;
                   throw error;
               }
           }, error => {
               var errmsg = new Error(error.message);
               throw errmsg;
           }) 
           .then(response => response.json())
           .then(leaders => dispatch(addLeaders(leaders)))
           .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
   type: ActionTypes.LEADERS_LOADING   
});

export const addLeaders = (leaders) => ({
   type: ActionTypes.ADD_LEADERS,
   payload: leaders
});

export const leadersFailed = (errmsg) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmsg
});