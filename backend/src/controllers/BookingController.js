const Booking = require('../models/Booking') ;

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user:user_id,
            spot:spot_id,
            date,
        });



        await booking.populate('spot').populate('user').execPopulate();

        const spot_owner_socket = req.connectedUser[booking.spot.user]

        if(spot_owner_socket)
        {
            req.io.to(spot_owner_socket).emit('booking_req', booking)
        }

        console.log('Enviando as informações de booking para o frontend: \n'+booking)

        return res.json(booking);

    }
};