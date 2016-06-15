'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

//var db = require('../_db');

module.exports = function(db) {

    return db.define('user', {
        name: {
            type: Sequelize.STRING,
            defaultValue: 'Dreamer'
        },
        photo: {
            type: Sequelize.STRING,
            defaultValue: '/images/dream-bubble.jpg'
        },
        phone: {
            type: Sequelize.STRING,
            validate: {
                isNumeric: true,
                min: 10
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shippingStreetAddress: {
            type: Sequelize.STRING
        },
        shippingCity: {
            type: Sequelize.STRING
        },
        shippingState: {
            type: Sequelize.STRING,
            validate: {
                is: /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
            }
        },
        shippingZip: {
            type: Sequelize.INTEGER,
            validate: {
                maxLength: function(zipcode){
                    return zipcode.length <=5;
                }
            }
        },
        billingStreetAddress: {
            type: Sequelize.STRING
        },
        billingCity: {
            type: Sequelize.STRING
        },
        billingState: {
            type: Sequelize.STRING,
            validate: {
                is: /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
            }
        },
        billingZip: {
            type: Sequelize.STRING,
            validate: {
                maxLength: function(zipcode){
                    return zipcode.length <=5;
                }
            }
        },
        salt: {
            type: Sequelize.STRING
        },
        twitter_id: {
            type: Sequelize.STRING
        },
        facebook_id: {
            type: Sequelize.STRING
        },
        google_id: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        instanceMethods: {
            sanitize: function() {
                return _.omit(this.toJSON(), ['password', 'salt']);
            },
            correctPassword: function(candidatePassword) {
                return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
            }
        },
        classMethods: {
            generateSalt: function() {
                return crypto.randomBytes(16).toString('base64');
            },
            encryptPassword: function(plainText, salt) {
                var hash = crypto.createHash('sha1');
                hash.update(plainText);
                hash.update(salt);
                return hash.digest('hex');
            }
        },
        hooks: {
            beforeValidate: function(user) {
                if (user.changed('password')) {
                    user.salt = user.Model.generateSalt();
                    user.password = user.Model.encryptPassword(user.password, user.salt);
                }
            }
        }
    });
};
