require('dotenv').config();
const Process_arg = require('./classes/Process_arg');
const arg_mng = new Process_arg(process.argv);

arg_mng.process_args();

const number = arg_mng.get_var("chatid");
console.log(`${number}`);