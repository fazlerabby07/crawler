"use strict";
 
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
// var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

if (config.use_env_variable) {
    console.log('xxxxx');
    var sequelize = new Sequelize(process.env[config.use_env_variable], {
        pool: {
            max: 5,
            min: 0,
            idle: 20000,
            acquire: 20000
        }
    });
  } else {
    console.log('yyyyy');
    var sequelize = new Sequelize(config.database, config.username, config.password, {
        dialect: 'mysql',
        port: 3306,
        define: {
          timestamps: false
        }
      });
  }
 
 
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });
 
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
 
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;
 
module.exports = db;