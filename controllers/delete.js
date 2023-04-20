const handleDelete = (req, res, db) => {
    db.transaction(trx => {
        trx('users')
        .where('email', req.body.email)
        .del()
        .then(() => {
            return trx('login')
            .where('email', req.body.email)
            .del()
            .then(res.json('Deleted'))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to delete'))
}

module.exports = {
    handleDelete: handleDelete
};