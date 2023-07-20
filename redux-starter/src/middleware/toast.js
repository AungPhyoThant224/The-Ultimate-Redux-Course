const toast = store => next => action => {
    if (action.type.toLowerCase() === 'error')
        console.log("Tostify:", action.payload.message);
    else
        next(action);
}

export default toast;