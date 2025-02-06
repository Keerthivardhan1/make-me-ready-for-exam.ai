import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host : "smtp.ethernal.email",
    port:567,
    secure:false,
    auth:{
        user:"keerthivardhantekulapelli@gmail.com",
        pass:"Keerthi@092004"
    }
})



async function sendMail(toMails , sub , msg ) {

    const res = await transporter.sendMail({
        from : "keerthivardhantekulapelli@gmail.com",
        to: toMails,
        subject : sub,
        text:msg,
        html:"<h1>Completed this and this </h1>"
    })


    console.log("Message sent  : " , res.messageId);
    
    
}


try {
    sendMail(["keerthivardhantekulapelli9@gmail.com"], "test mail " , "test msg");

} catch (error) {
    console.log("Unable to send the  mail : " , error.message );
}