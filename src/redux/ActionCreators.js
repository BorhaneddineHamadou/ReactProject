import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment) =>{
    return({
        type: ActionTypes.ADD_COMMENT,
        payload:{
            dishId: dishId,
            rating: rating,
            author: author,
            comment: comment
        }
    });
}

export const fetchDishes = () => (dispatch) =>{
    dispatch(dishesLoading());
    
    return fetch (baseUrl + 'dishes')
            .then(response => response.json())
            .then(dishes => dispatch(addDishes(dishes)));
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
           .then(response => response.json())
           .then(comments => dispatch(addComments(comments)))
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
          .then(response => response.json())
          .then(promos => dispatch(addPromos(promos)))
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