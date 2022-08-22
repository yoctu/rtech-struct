type InApp = {
    id: string,
    type: 'notification/in-app',
    createdAt: string,
    notification_type: string,
    content: Record<string, unknown>,
    acknowledges?: string[],
    recipients?: string[],
};

export default InApp;
