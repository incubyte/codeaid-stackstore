'use strict';

const express = require('express');
const router = express.Router();
var _ = require('lodash');
var User = require('../../db').model('user');
var Order = require('../../db').model('orders');
var OrderItems = require('../../db').model('orderItems');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport('smtps://ghopperphotos%40gmail.com:GraceHopp3r@smtp.gmail.com');

// setup e-mail data 
var mailOptions = {
    //from: '"Fred Foo" <foo@blurdybloop.com>', // sender address
    to: 'katrinamvelez@gmail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Your order has been processed', // plaintext body
    html: '<b>Hello world </b>' // html body
};



module.exports = router;


// Get ALL orders for user
// router.get('/:id', function(req, res, next) {
//     Order.findAll({
//             where: {
//                 status: 'Pending',
//                 userId: req.user.id
//             }
//         })
//         .then(function(orders) {
//             res.json(orders);
//         })
//         .catch(next);
// });

router.put('/', function(req, res, next) {
    var processedOrder;
    // var order;
    // if (req.user) {
        // Order.findOne({
        //         where: {
        //             userId: req.user.id
        //         }
        //     })
        //     .then(function(order) {
        //         order.update({
        //             status: 'Processed'
        //         })
        //     })
        //     .then(function(processedOrder) {
        //         res.json(processedOrder);
        //     })
    // } else {
        Order.findById(req.session.orderId)
            .then(function(order) {
                order.update({
                    status: 'Processed'
                })
            })
            .then(function(updatedOrder){
            	transporter.sendMail(mailOptions, function(error, info){
            		if (error) {
            			return console.log(error);
            		}
            		console.log('Message sent: ', info.response);
            	})
            })
            .then(function(updatedOrder){
            	return Order.create();
            })
            .then(function(newOrder){
            	req.session.orderId = newOrder.id;
            	res.json(newOrder);
            });

    //}
})
