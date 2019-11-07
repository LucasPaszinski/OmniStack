//index, show, store, update, destroy

const User = require('../models/User');

module.exports = {
    //Função assincrona
    async store(req, res) {

        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            await User.create({ email });
            user = await User.findOne({ email });
        }  
        return res.json(user);
    },

    async index(req, res){
        const { user_id } = req.query;
        const user = await User.findById(user_id);
        console.log(user);
        return res.json(user);
    }
}