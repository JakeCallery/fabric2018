let SerialPort = require("serialport");

let port = new SerialPort("COM8", {
    baudRate: 57600,
    autoOpen: false
});

SerialPort.list(($err, $ports) => {
    $ports.forEach(($port) => {
        console.log($port.comName);
        console.log($port.pnpId);
        console.log($port.manufacturer);
        console.log('------------');
    });
});