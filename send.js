const axios = require('axios');
require('console-png').attachTo(console);
const fs = require('fs');
const CourierClient = require('@trycourier/courier').CourierClient;
class KennDer {
    constructor() {
        this.url_api_base = "https://api.courier.com/";
        this.pk_api = "YOUR_AUTH_TOKEN_HERE"; //user api
        this.template = "TEMPLATE_TOKEN"; //template api
        this.courier = new CourierClient({ authorizationToken: this.pk_api });
    }

    async email(email) {
        let name = '';
        if (email.includes('@')) {
            name = email.substring(0, email.indexOf('@'));
        } else {
            name = email;
        }

        const domainmap = email.substring(email.indexOf('@') + 1);
        const state = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"][Math.floor(Math.random() * 15)];
        const ip = `${Math.floor(Math.random() * 99) + 1}.${Math.floor(Math.random() * 999) + 111}.${Math.floor(Math.random() * 999) + 111}.9`;
        const subject = `【#${Math.floor(Math.random() * 9999) + 1110}-${Math.floor(Math.random() * 999) + 111}Subject : ${ip}/${state}`;

        try {
            const result = await this.courier.send({
            event: this.template, // Fix: Change 'eventId' to 'event'
            recipient: email, // Fix: Pass the recipient as a string
            profile: {
                email: email,
                name: name
            },
            data: {
                email: email,
                name: name,
                subject: subject,
                state: state,
                ip: ip,
                link: 'https://test.com/',
            }
            });

            if (result.messageId) {
                console.log(`Email Berhasil terkirim : ${result.messageId}`);
                fs.appendFileSync('log/sent.txt', `${email}\n`);
            } else {
                console.log(`Gagal Terkirim : ${result.messageId}`);
                fs.appendFileSync('log/unsent.txt', `${email}\n`);
            }
        } catch (error) {
            console.log(`Konfigurasi Salah! ${error.message}`);
            fs.appendFileSync('log/gagal.txt', `${email}\n`);
        }
    }
}

const kennder = new KennDer();
const emails = fs.readFileSync(process.argv[2], 'utf-8').split('\n');
emails.forEach(email => kennder.email(email));
console.log(`
 ##  ##   ######   ##  ##   ##  ##   ######   ####     ##  ##  
 ## ##    ##       ### ##   ### ##   ##       ## ##    ##  ##  
 ####     ##       ######   ######   ##       ##  ##   ##  ##  
 ###      ####     ######   ######   ####     ##  ##    ####   
 ####     ##       ## ###   ## ###   ##       ##  ##     ##    
 ## ##    ##       ##  ##   ##  ##   ##       ## ##      ##    
 ##  ##   ######   ##  ##   ##  ##   ######   ####       ##
 ---------------------Email Sender---------------------------
 ---------------------gscpriv.com----------------------------        
`);