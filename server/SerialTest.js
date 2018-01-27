let SerialPort = require("serialport");

let port = new SerialPort("COM8", {
    baudRate: 57600,
    autoOpen: false
});

port.open(($err) => {
    if($err) {
        return console.log('Error opening port: ', $err.message);
    }
});

port.on('open', () => {
    console.log('Serial Port Open');
    setTimeout(() => {
        port.write('1');
    }, 3000);
});

port.on('data', ($data) => {
    console.log('Data: ', $data.toString());
});



