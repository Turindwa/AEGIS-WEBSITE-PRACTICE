export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET','LVzBrQNN4ZkvD1StDSZliw=='),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT','hE+9oWg+Tt260bw4M7xwNw=='),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
