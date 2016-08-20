const Token= require('../models/token-model').Token;
const mongoose = require('mongoose');

var tokenDB ={
};

tokenDB.findOne = function(entityId, tokenValue, callback){
	Token.findOne(
    {
        entityId: mongoose.Types.ObjectId(entityId),
        tokenValue: tokenValue
    },
    function(err, token) {
        if(err) {
            return callback(err,token);
        }
        if(!token){
            return callback('Invalid data',token)
        }
        return callback(err,token);
    });
}

tokenDB.removeOne = function(entityId,tokenValue,callback){
    Token.findOneAndRemove(
        {
            entityId:entityId,
            tokenValue:tokenValue
        },
        function(err,token) {
            if(err){
                return callback(err,token);
            }
            if(!token){
                return callback('Invalid data',token)
            }  
            return callback(err,token);  
        });
}

module.exports = tokenDB;