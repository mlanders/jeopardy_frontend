import {
    SET_USER,
    HANDLE_CHANGE,
    CLEAR_TODOS,
    MARK_COMPLETE
} from '../constants';

const initialState = {
    userProfile: {
        uid: '',
        email: '',
        photo: '',
        name: ''
    },
    games: [
        {
            gameName: '',
            author: '',
            id: ''
        }
    ],
    inputValue: ''
};

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
        case HANDLE_CHANGE:
            return {
                ...state,
                inputValue: action.payload
            };
        case MARK_COMPLETE:
            return {
                ...state,
                toDos: state.toDos.map(toDo => {
                    return toDo.id === action.payload
                        ? { ...toDo, completed: !toDo.completed }
                        : toDo;
                })
            };
        case CLEAR_TODOS:
            return {
                ...state,
                toDos: state.toDos.filter(toDo => !toDo.completed)
            };
        default:
            return state;
    }
};
