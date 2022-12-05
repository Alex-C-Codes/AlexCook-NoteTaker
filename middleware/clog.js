// custom middleware that logs the type and path of each request to the server
const clog = (req, res, next) => {
    switch (req.method) {
        case 'GET': {
            console.info(`${req.method} request to ${req.path}`);
            break;
        }
        case 'POST': {
            console.info(`${req.method} request to ${req.path}`);
            break;
        }
        default:
            console.info(`${req.method} request to ${req.path}`);
    }

    next();
}

exports.clog = clog;