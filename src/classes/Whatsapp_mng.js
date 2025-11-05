const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

class Whatsapp_mng {
    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth({ dataPath: 'sesion' })
        });

        this.isReady = false;
        this.initialized = false;

        this.client.on('qr', qr => {
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            console.log('Cliente listo\n');
            this.isReady = true;
        });
    }

    // Método para iniciar el cliente
    async init() {
        if (!this.initialized) {
            console.log('Inicializando sesión de WhatsApp...');
            this.initialized = true;
            await this.client.initialize();
            await this.ensureReady(); // Asegura que esté listo antes de continuar
        } else {
            await this.ensureReady();
        }
    }

    // Método para guardar una sesión (espera 1 minuto después de estar listo)
    async saveSession() {
        await this.init();
        console.log('Esperando un minuto para guardar la sesión...');
        await this.sleep(60000)
        console.log('Sesión guardada correctamente');
    }

    // Método para mandar un mensaje
    async sendMessage(to, message) {
        await this.init();
        await this.client.sendMessage(to, message);
        await this.sleep(2000)
        console.log(`Mensaje enviado a ${to}`);
    }

    // Método para listar los chats de esta sesión
    async listChats() {
        await this.init();
        const chats = await this.client.getChats();
        chats.forEach(chat => {
            console.log(`Nombre: ${chat.name || chat.formattedTitle || 'Sin nombre'}`);
            console.log(`\nID: ${chat.id._serialized}\n`)
        });
    }

    async findChat(chatname){
        await this.init();
        const chats = await this.client.getChats();
        chats.forEach(chat => {
            const id = chat.id._serialized
            const name = chat.name
            if(name.includes(chatname)){
                console.log(`Nombre: ${name}\nID: ${id}\n`)
            }
        });
    }

    // Método para asegurarse que el cliente está listo
    async ensureReady() {
        if (this.isReady) return;
        console.log('Esperando que el cliente esté listo...');
        await new Promise(resolve => {
            this.client.on('ready', () => {
                this.isReady = true;
                resolve();
            });
        });
    }

    async sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async exit(){
        process.exit(0);
    }
}

module.exports = Whatsapp_mng;