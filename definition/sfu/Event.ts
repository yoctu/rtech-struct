type SFUEvent = {
    id?: string,
    type: 'sfu/event' | string,
    created_at?: string,
    key: string,
    content: Record<string, unknown>,
    source: string,
};

export default SFUEvent;
