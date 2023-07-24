const toast = store => next => action => {
    if (action.type.toLowerCase() === 'error')
        console.log("Tostify:", action.payload.message);
    else
        return next(action);
}

export default toast;