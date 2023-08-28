import { Twilio } from 'twilio';

const client = new Twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export const sendMessage = async (message: string, number: string) => {
    const twilioResponse = client.messages
        .create({
            body: message,
            messagingServiceSid: process.env.TWILIO_MESSAGE_SERVICE_ID,
            to: number,
        })
        .then((message: any) => {
            if (message.status.toLowerCase() == 'accepted') {
                return {
                    status: message.status,
                    message: 'Message sent successfully',
                    code: 200,
                    body: message.body,
                    to: message.to,
                    dateUpdated: message.dateUpdated,
                    dateCreated: message.dateCreated,
                };
            }
        })
        .catch((error: any) => {
            return {
                status: 'error',
                code: error.status,
                message: 'Message not sent',
                twilioErrorCode: error.code,
                errorInfoLink: error.moreInfo,
            };
        });
    return twilioResponse;
};
