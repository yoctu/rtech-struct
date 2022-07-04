type Message = {
    id: string,
    date: string,
    type: 'message',
    status: string,
    source: string[],
    target: string[],
    key: string,
    subject: string,
    message: string,
    channel: string,
    from: string,
};

export default Message;
