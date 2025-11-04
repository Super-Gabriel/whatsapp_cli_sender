class Process_arg{
    constructor(args){
        this.args = args;
    }
    
    
    process_args(){
        const flag = this.args[2]
        
        switch(flag){ //switch para definir la primera flag
            case "-m": console.log("1");break;
            case "-f": console.log("2");break;
            default: console.log(`flag ${flag} no valida`);break;
        }
    
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