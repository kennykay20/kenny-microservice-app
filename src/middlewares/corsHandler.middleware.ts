export const corsHandlerOption = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  exposedHeaders: ['set-cookie', 'Set-Cookie'],
};
