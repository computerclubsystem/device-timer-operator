export interface ServerInfoReply {
  header: {
    type: 'server-info-reply',
  },
  body: {
    version: string;
  },
}
