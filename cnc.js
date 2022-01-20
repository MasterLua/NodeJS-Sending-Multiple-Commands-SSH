var SSH = require('simple-ssh');
const server = require('./server.json');
const config = require('./config.json');
var HasBeenWaiting = false
var Commands = "";
var HasBeenSending = 0

console.log("[+] Thanks to use my script || Created by Redouu.")
console.log("[+] Starting sending to " + server.length + " servers.")
console.log("[*] The commands has been sending is : " + Commands + "\n")

if (config.StaticCommands == "Nothing") {
    Commands = process.argv.slice(2).join(" ");
}else{
    Commands = config.StaticCommands;
}

function SendToArray(ArrayID) {
    console.log("[-] Sending commands on Server #" + ArrayID + " (" + server[ArrayID].Host + ")");
    var ssh = new SSH({
        host: server[ArrayID].Host,
        port: server[ArrayID].Port,
        user: server[ArrayID].User,
        pass: server[ArrayID].Pass
    });
    ssh.exec(Commands, {}).start();
    setTimeout(function(){
        HasBeenSending++;
        if(server.length == HasBeenSending) {
            console.log("\n[!] Sending has been finish. Thanks to use the script.")
        }else{
            SendToArray(HasBeenSending);    
        }
    }, 1000)    
}

SendToArray(HasBeenSending);
