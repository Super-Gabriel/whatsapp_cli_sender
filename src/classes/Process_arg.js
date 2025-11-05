class Process_arg{
    constructor(args){
        this.args = args;
    }

    // metodo para obtener 
    get_var(variable){
        for(let i=0; i<this.args.length; i++){
            if(this.args[i].includes(variable+"=")){
                return this.args[i].split("=")[1]
            }
        }
    }

    show_args(){
        console.log(`args:\n${this.args}`);
    }

}

module.exports = Process_arg;