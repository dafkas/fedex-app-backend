const to = promise =>
    promise
        .then(data => ({
            err: null,
            data
        }))
        .catch(err => {
            err;
        });

module.exports = to;
