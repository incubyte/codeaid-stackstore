'use strict';

const express = require('express');
const router = express.Router();
const $Promise = require('bluebird');
var Order = require('../../db').model('orders');
var User = require('../../db').model('user');
var Dream = require('../../db').model('dream');
var OrderItems = require('../../db').model('orderItems');

module.exports = router;

router.post('/:id', function(req, res, next) {
    Dream.findById(req.body.product.id)
        .then(function(dream) {
            dream.update({
                quantity: dream.quantity - Number(req.body.amount)
            });
        });
    var order;
    Order.findOrCreate({
            where: {
                //dreamId: req.body.product.id,
                userId: req.user.id
            }
        })
        .then(function(data) {
            order = data;
            console.log("heres the order:" , order);
            return OrderItems.create({
                dreamId: req.body.product.id,
                orderId: order[0].id,
                amount: req.body.amount,
                priceAtPurchase: req.body.product.price
            });
        })
        .then(function() {
            return Order.findById(order[0].id, {
                include: [OrderItems, Dream]
            });
           
        })
        .then(function(order){
            res.json(order);
        });
        // .then(function(orders) {
        //     $Promise.map(orders, function(order) {
        //         console.log("Order looks like: ", order);
        //         order.getOrderItems()

        //         .then(function(item) {
        //                 console.log("Item looks like: ", item);
        //                 return item.amount * item.priceAtPurchase;
        //             })
        //             .then(function(data) {
        //                 console.log("This is what data looks like: ", data);
        //             });
        //     });


        // });

    // .then(function(item) {
    //     User.findById(req.user.id)
    //         .then(function(user) {
    //             user.getOrders()
    //                 .then(function(orders) {
    //                     $Promise.map(orders, function(order) {
    //                         return order.getDream().then(function(dream) {
    //                             order.update({
    //                                 total: parseFloat(order.quantity) * dream.price
    //                             });
    //                         });
    //                     });
    //                     return user;
    //                 })
    //                 .then(function(user) {
    //                     return user.getOrders().then(function(orders) {
    //                             return orders.reduce(function(a, b) {
    //                                 return a + b.total;
    //                             }, 0);
    //                         })
    //                         .then(function(total) {
    //                             res.json({ user: user, total: total, amount: req.body.amount });
    //                         });
    //                 });
    //         });
    // });
});

router.put('/:id', function(req, res, next) {

});

router.get('/:id', function(req, res, next) {
    User.findById(req.params.id)
        .then(function(user) {
            return user.getOrders();
        })
        .then(function(orders) {
            var dreams = [];
            var total = orders.reduce(function(a, b) {
                return a + b.total;
            }, 0);
            orders.forEach(function(order) {
                order.getDream()
                    .then(function(dream) {
                        dreams.push(dream);
                    });
            });


            return { orders: orders, dreams: dreams, total: total };
        })
        .then(function(obj) {
            res.json(obj);
        });
});






// User.findOne({
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(function(user) {
//         Order.findOne({
//                 where: {
//                     userId: user.id
//                 }
//             })
//             .then(function(order) {
//                 console.log("ORDER", order);
//                 console.log("REQUEST BODY", req.body);
//                 if (!order) {
//                     return Order.create({
//                         status: 'Pending',
//                         quantity: req.body.amount,
//                         userId: user.id,
//                         dreamId: req.body.product.id
//                     })
//                 } 
//                 else return order;
//             })
//             .then(function(order) {
//                 console.log(user.getOrders());
//                 return user.getOrders();
//             })
//             .then(function(orders) {
//                 var total = 0;
//                 console.log("ORDERS AFTER GETTING FROM USER", orders);
//                 orders.forEach(function(order) {
//                         // return order.getDream();
//                         return Dream.findById(order.dreamId);
//                     })
//                     .then(function(dream) {
//                         total += order.quantity * dream.price;
//                     })
//                 return total;
//             })

//         .then(function(total) {
//             res.json({ user: user, total: total, amount: req.body.amount });
//         });

// return user.addDream(req.body.product.id)
//     .then(function() {

//         return Dream.findById(req.body.product.id)
//             .then(function(dream) {
//                 dream.update({
//                     quantity: Number(req.body.product.quantity) - req.body.amount
//                 });
//             })
//             .then(function(dream){
//                 return user.getDreams().then(function(dreams){
//                     return dreams.reduce(function(a,b){
//                         if (b === dream) return a + b.price*req.body.amount;
//                         else return a + b.price;
//                     }, 0);
//                 });
//             });

// return user.getDreams().then(function(dreams) {
//     return dreams.reduce(function(a, b) {
//         return a + b.price;
//     }, 0)
// });

// });

// })
