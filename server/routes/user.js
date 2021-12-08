router.post('/login', (req, res, next) => {
    const { username } = req.body;

    if (!username || username.trim() === '')
        return res.status(400).send({ error: '<span class="error notice">Username cannot be empty!</span>' });

    users.findOne({
            username: username
        })
        .then(user => {
            if (user) {
                return res.status(409).send({ error: '<span class="error notice">Username is taken!</span>' });;
            }
            const newUser = new users({
                username: username.trim(),
            });
            newUser.save();
            res.status(200).send({ username: username.trim() });
            res.redirect('/chat/' + username);
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });

});