//index, show, store, update, destroy

const User = require('../models/User');

module.exports = {
    //Função assincrona
    async store(req, res) {

        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            await User.create({ email });
        }

        return res.json(user);
    }
}