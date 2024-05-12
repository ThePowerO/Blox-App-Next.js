import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { ActivationTemplate } from './emailTemplates/activation';
import { resetPasswordTemplate } from './emailTemplates/resetPass';

export async function sendMail({to, subject, body}: {to:string, subject:string, body:string}) {
    // send email
    const { SMPT_EMAIL, SMPT_GMAIL_PASS } = process.env;
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SMPT_EMAIL,
            pass: SMPT_GMAIL_PASS,
        },
    });

    try {
        const testResult = await transport.verify();
        console.log("Test Result of Email: ", testResult);
    } catch (error) {
        console.log(error);
    }
    try {
        const sendResult = await transport.sendMail({
            from: SMPT_EMAIL,
            to,
            subject,
            html: body,
        });
        console.log({ sendResult })
    } catch (error) {
        console.log(error)
    }
}

export function compileActivationTemplate(name: string, url: string) {
    const template = Handlebars.compile(ActivationTemplate);
    const htmlBody = template({name, url});
    return htmlBody;
}

export function compileResetPasswordTemplate(name: string, url: string) {
    const template = Handlebars.compile(resetPasswordTemplate);
    const htmlBody = template({name, url})
    return htmlBody;
}