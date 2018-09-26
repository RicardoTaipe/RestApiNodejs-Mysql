const mysql = require('mysql');

//setting config params

const mysqlConnection= mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'company',
	multipleStatements: true
})

mysqlConnection.connect((err)=>{
	if(err){
		console.log(err)
		return;
	}else{
		console.log('Db is connected');
	}
});

module.exports = mysqlConnection;