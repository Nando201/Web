var mysql = require('mysql');
var mqtt = require('mqtt');


//CREDENCIALES MYSQL
var con = mysql.createConnection({
  host: "chia4iot.ml",
  user: "admin_chia4iot",
  password: "aws12345chiaiot4.0",
  database: "admin_chia4iot"
});

//CREDENCIALES MQTT
var options = {
  port: 1883,
  host: 'chia4iot.ml',
  clientId: 'acces_control_' + Math.round(Math.random() * (0- 10000) * -1) ,
  username: 'web_client',
  password: 'ws123mxq23',
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clean: true,
  encoding: 'utf8'
};

var client = mqtt.connect("mqtt://chia4iot.ml", options);

//SE REALIZA LA CONEXION
client.on('connect', function () {
  console.log("Conexión  MQTT Exitosa!");
  client.subscribe('+/#', function (err) {
    console.log("Subscripción exitosa!")
  });
})

//CUANDO SE RECIBE MENSAJE
client.on('message', function (topic, message) {
  console.log("Mensaje recibido desde -> " + topic + " Mensaje -> " + message.toString());
     if (topic == "values"){
       var msg = message.toString();
       var sp = msg.split(",");
       var temp1 = sp[0];
       var humedad = sp[1];

       if(temp1 = sp[0] > 18){
         console.log("Email enviado");
       }


    //hacemos la consulta para insertar....
    //   var query = "INSERT INTO `admin_chia4iot`.`data` (`data_temp1`, `data_temp2`) VALUES (" + temp1 + ", " + humedad + ");";
    //   con.query(query, function (err, result, fields) {
    //   if (err) throw err;
    //   console.log("Fila insertada correctamente");

    //   });


    }
});




//nos conectamos
con.connect(function(err){
  if (err) throw err;

  //una vez conectados, podemos hacer consultas.
  console.log("Conexión a MYSQL exitosa!!!")

  //hacemos la consulta
//  var query = "SELECT * FROM devices WHERE 1";
//  con.query(query, function (err, result, fields) {
//    if (err) throw err;
//    if(result.length>0){
//      console.log(result);
//    }
//  });

  var query = "SELECT * FROM data WHERE 1";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    if(result.length>0){
      console.log(result);
    }
  });
});


//para mantener la sesión con mysql abierta
setInterval(function () {
  var query ='SELECT 1 + 1 as result';

  con.query(query, function (err, result, fields) {
    if (err) throw err;
  });

}, 5000);
