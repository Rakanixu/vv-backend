import * as SparkPost from 'sparkpost';
import { config } from '../config';

const client: SparkPost = new SparkPost(config.sparkpost.apiKey);

export async function sendEmail(from: string, subject: string, htmlContent: string, recipients:  string[]) {
    const sendTo: SparkPost.Recipient[] = recipients.map((addr) => {
        return {
            address: addr
        };
    });

    return client.transmissions.send({
    options: {
      sandbox: config.sparkpost.sandbox
    },
    content: {
      from: from,
      subject: subject,
      html: htmlContent
    },
    recipients: sendTo
  });
}

export async function sendEmailWithTemplate(templateId: string, vars: any, recipients:  string[]) {
    console.log(`Sending email to ${recipients}, template ${templateId}`);
    const sendTo: SparkPost.Recipient[] = recipients.map((addr) => {
        return {
            address: addr
        };
    });
    return client.transmissions.send({
    options: {
      sandbox: config.sparkpost.sandbox
    },
    content: {
        template_id: templateId
    },
    substitution_data: vars,
    recipients: sendTo
  });
}
