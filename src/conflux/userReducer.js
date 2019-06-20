import {
    SET_USER,
    SET_GAMES,
    SET_QUESTIONS,
    SET_QUESTIONS_FILTERED,
    CLEAR_TODOS,
    SET_INPUT
} from './constants';
import { createContext } from 'react';

const initialState = {
    userProfile: {
        uid: '',
        email: '',
        photo: '',
        name: ''
    },
    games: [],
    questions: [],
    questionsFiltered: null,
    inputValue: ''
};

export const userContext = createContext();

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                userProfile: {
                    uid: action.payload.uid,
                    email: action.payload.email,
                    photo: action.payload.photo,
                    name: action.payload.name
                }
            };
        case SET_GAMES:
            return {
                ...state,
                games: action.payload
            };
        case SET_QUESTIONS:
            return {
                ...state,
                questions: action.payload
            };
        case SET_QUESTIONS_FILTERED:
            return {
                ...state,
                questionsFiltered: action.payload
            };
        case SET_INPUT:
            return {
                ...state,
                inputValue: action.payload
            };
        case CLEAR_TODOS:
            return {
                ...state
            };
        default:
            return state;
    }
};
