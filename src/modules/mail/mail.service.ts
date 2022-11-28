import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter, SentMessageInfo } from 'nodemailer';
import { VerifyTemplate } from './template/verify.template';
@Injectable()
export class MailService implements OnModuleInit {
    private transporter: Transporter;
    private template: Record<string, (payload: any) => string>;
    constructor(private configService: ConfigService) {
        this.template = { ...this.template, verifyTeplate: VerifyTemplate };
    }
    async onModuleInit() {
        this.transporter = createTransport({
            host: this.configService.getOrThrow('SMTP_HOST'),
            port: this.configService.get('SMTP_PORT') || 587,
            secure: false,
            auth: {
                user: 'admin@allins.com.tr', // this.configService.getOrThrow('SMTP_USERNAME'),
                pass: 'All1nsallins', // this.configService.getOrThrow('SMTP_PASSWORD'),
            },
        });
    }

    async sendMail(
        template: 'verifyTeplate',
        data: {
            from: string;
            to: string;
            subject: string;
            text: string;
            payload: any;
        },
    ) {
        const { from, to, subject, text, payload } = data;
        let info = await this.transporter.sendMail({
            from, // sender address
            to, // list of receivers
            subject,
            text,
            html: this.template[template](payload),
        });
    }
}
