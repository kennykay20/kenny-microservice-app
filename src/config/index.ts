import * as dotenv from 'dotenv';
import * as joi from 'joi';

process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH })
  : dotenv.config();

const schema = joi
  .object({
    PORT: joi.number().required(),
    NODE_ENV: joi
      .string()
      .valid('development', 'dev', 'production', 'staging', 'test')
      .required(),
    //Services
    USER_SVC: joi.string().required(),
    AUTH_SVC: joi.string().required(),
    REDIS_URL: joi.string(),
  })
  .unknown()
  .required();

const { error, value: envVars } = schema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  isDevelopment: envVars.NODE_ENV === 'development' ? true : false,
  // isLocahost: envVars.NODE_ENV === 'development' ? true : false,
  isStaging: envVars.NODE_ENV === 'staging' ? true : false,
  isTesting: envVars.NODE_ENV === 'test' ? true : false,
  isProduction: envVars.NODE_ENV === 'production' ? true : false,
  port: envVars.PORT,
  NODE_ENV: envVars.NODE_ENV,
  db: {
    port: envVars.DBPORT,
    host: envVars.DBHOST,
    username: envVars.DBUSERNAME,
    password: envVars.DBPASSWORD,
    name: envVars.DBDATABASE,
    logging: envVars.DATABASE_LOGGING,
  },
  authSvc: envVars.AUTH_SVC,
  userSvc: envVars.USER_SVC,
  redisUrl: envVars.REDIS_URL,
  accessTokenSecret: envVars.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: envVars.REFRESH_TOKEN_SECRET,
};
