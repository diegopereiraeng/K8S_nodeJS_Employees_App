var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var Connection = require('mongodb').Connection;


const urlpre = process.env.MONGOURL ||"mongo.prod.svc.cluster.local"

const url = "mongodb://"+urlpre+':27017' //|| 'mongodb://mongo.prod.svc.cluster.local:27017';

const dbName = 'employees';
console.log("Mongo Server: " + url);
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;


const client = new MongoClient(url);


// Use connect method to connect to the server
const Database =  MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    assert.equal(null, err);

    console.log("Connected successfully to server "+ url);
    console.log("MongoURL = "+ url);
    this.db = client.db(dbName);


});

EmployeeProvider = function() {

  //this.db= new MongoClient('node-mongo-employee', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  //await client.connect();
};
EmployeeProvider = function(host, port) {
  //this.db= new MongoClient('node-mongo-employee', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  //await client.connect();
}; 

/* EmployeeProvider = function(host, port) {
  //this.db = new MongoClient('node-mongo-employee', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  MongoClient.connect(url, function(err, client){});
}; */


EmployeeProvider.prototype.getCollection= function(callback) {
  db.collection('employees', function(error, employee_collection) {
    if( error ) callback(error);
    else callback(null, employee_collection);
  });
};

//find all employees
EmployeeProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error)
      else {
        employee_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//save new employee
EmployeeProvider.prototype.save = function(employees, callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error)
      else {
        if( typeof(employees.length)=="undefined")
          employees = [employees];

        for( var i =0;i< employees.length;i++ ) {
          employee = employees[i];
          //employee.created_at = new Date();
        }

        employee_collection.insert(employees, function() {
          callback(null, employees);
        });
      }
    });
};

// find an employee by ID
EmployeeProvider.prototype.findById = function(id, callback) {
  this.getCollection(function(error, employee_collection) {
    if ( error ) callback (error )
    else {
      //employee_collection.findOne({_id: employee_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function (error, result) {
      employee_collection.findOne({_id: ObjectID(id)}, function (error, result) {
        if( error ) callback(error)
        else callback(null, result)
      });
    }
  });
};

// update an employee
EmployeeProvider.prototype.update = function (employeeId, employees, callback) {
  this.getCollection(function(error, employee_collection) {
    console.log("ERROR", employeeId)
    if( error ) callback(error);
    else {
      employee_collection.update(
	//{_id: employee_collection.db.bson_serializer.ObjectID.createFromHexString(employeeId)},
	{_id: ObjectID(employeeId)},
        employees,
	function( error, employees) {
	  if(error) callback (error);
	  else callback (null, employees)
        });
      }
    });
};

//delete employee
EmployeeProvider.prototype.delete = function(employeeId, callback) {
  this.getCollection(function(error, employee_collection) {
    console.log("ERROR", employeeId)
    if( error ) callback(error);
    else {
      employee_collection.remove(
        //{_id: employee_collection.db.bson_serializer.ObjectID.createFromHexString(employeeId)},
        {_id: ObjectID(employeeId)},
        function(error, employee) {
          if(error) callback(erro);
          else callback(null, employee)
        });
      }
    })
};

exports.EmployeeProvider = EmployeeProvider;
