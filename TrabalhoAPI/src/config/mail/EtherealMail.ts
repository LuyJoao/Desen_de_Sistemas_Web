import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface ITemplateVariable{
    [key: string] : string | number;
}

interface IParteMailTemplate{
    file: string;
    variables: ITemplateVariable
}

interface IMailContact{
    name: string;
    email: string;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParteMailTemplate;
}

export default class EtherealMail {
    static async sendMail({ to, from, subject, templateData }: ISendMail ): Promise<void> {
        const account = await nodemailer.createTestAccount();
        const mailTemplate = new HandlebarsMailTemplate();
        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            auth : {
                user : account.user,
                pass : account.pass,
            }
        });
        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe API Vendas',
                address: from?.email || 'equipe_vendas@gmail.com'
            },
            to:{
                name: to.name,
                address: to.email
            },
            subject,
            html: await mailTemplate.parse(templateData)
        })
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL %s', nodemailer.getTestMessageUrl(message));
    }
}