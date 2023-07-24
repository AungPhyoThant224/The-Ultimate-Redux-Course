const logger = param => store => next => action => {
    console.log("Logger", param);
    return next(action);
}

export default logger;