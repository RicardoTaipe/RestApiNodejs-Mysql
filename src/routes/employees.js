const express = require('express');

//Create an object to define Routes in server
const router = express.Router();

const mysqlConnection = require('../database');

//Retrieve all employees from mysql db 
router.get('/', (req,res)=>{

    mysqlConnection.query('SELECT * FROM employees;',(err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    });
})

//Retrieve an specific employee  
router.get('/:id', (req,res)=>{
    const {id} = req.params;
    //avoid sql injection
    mysqlConnection.query('SELECT * FROM employees WHERE id = ?;',[id],(error,rows,fields)=>{
        if(!error){
            res.json(rows[0]);
        }else{
            console.log(error);
        }
    });
})

//Create a new employee
router.post('/', (req, res) => {
    const {id, name, salary} = req.body;
    console.log(typeof(id) , name, salary);
    const query = `
      SET @id = ?;
      SET @name = ?;
      SET @salary = ?;
      CALL employeeAddOrEdit(@id, @name, @salary);
    `;
    mysqlConnection.query(query, [Number.parseInt(id) , name, salary], (err, rows, fields) => {
      if(!err) {
        res.json({status: "Employeed Saved"});
      } else {
        console.log(err);
      }
    });  
  });

  //Update an employee 
  router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {name, salary} = req.body;
    const query = `
      SET @id = ?;
      SET @name = ?;
      SET @salary = ?;
      CALL employeeAddOrEdit(@id, @name, @salary);
    `;
    mysqlConnection.query(query, [Number.parseInt(id) , name, salary], (err, rows, fields) => {
      if(!err) {
        res.json({status: "Employeed Updated"});
      } else {
        console.log(err);
      }
    });  
  });

  //Delete employee by id
  router.delete('/:id',(req,res)=>{
      const {id} = req.params;
      mysqlConnection.query('DELETE FROM employees WHERE id=?',[id],(err,rows,fields)=>{
          if(!err){
              res.json({status:'Employee Deleted'});
          }else{
              console.log(err);
          }
      });
  });


module.exports = router;