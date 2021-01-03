
const userReducer = (state = {data : 'hello world!'}, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                ...state, 
                user: action.data,
            }
        case "ADDROW":
            return {
                ...state,
                addrow : action.data,
            }
        default:
            return state;
    }
};

export default userReducer;