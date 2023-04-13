const axios = require('axios');

exports.getHealth = (req, res, next) => {
    axios.get('https://dsague.fr/health')
        .then(response => {
            res.status(200).json({ response: response.data });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};