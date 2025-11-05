require('dotenv').config();
const { beforeEach } = require('node:test');
const Process_arg = require('./classes/Process_arg');
const Whatsapp_mng = require('./classes/Whatsapp_mng')

const arg_mng = new Process_arg(process.argv);
const whatsapp_mng = new Whatsapp_mng();
const flag = process.argv[2]


function main(){
    switch(flag){
        case "-s": save_session(); break;
        case "-f": find_chat(); break;
        case "-m": message(); break;
        case "-ml": message_list(); break;
        case "-t": whatsapp_mng.test(); break;
        default: console.log(`flag: ${flag} :no definida`);
    }
}

async function save_session(){
    console.log('opción: guardar sesión\n')
    await whatsapp_mng.saveSession()
    whatsapp_mng.exit()
}

async function find_chat(){
    console.log('opción: buscar chat\n')
    const chatname = arg_mng.get_var("chatname")
    if(chatname){
        await whatsapp_mng.findChat(chatname)
    }
    whatsapp_mng.exit()
}

async function message(){
    console.log('opción: mandar mensaje\n')
    const chatid = arg_mng.get_var("chatid")
    const message = arg_mng.get_var("message")
    await whatsapp_mng.sendMessage(chatid, message)
    whatsapp_mng.exit()
}

async function message_list(){
    console.log('opción: mandar lista de mensajes\n')
    console.log("lista de mensajes")
}

main()