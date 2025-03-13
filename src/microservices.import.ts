import { user as UserProto, auth as AuthProto } from 'kenny-proto';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from './config';
import { TYPES } from './types';
import { join } from 'path';
import { Logger } from '@nestjs/common';

Logger.log(`UserProto ${UserProto}`);

console.log('User Proto Path:', UserProto);
console.log('Auth Proto Path:', AuthProto);

const loader = {
  includeDirs: [
    join(__dirname, '../node_modules/kenny-proto/proto'),
    join(__dirname, '../node_modules/google-proto-files'),
  ],
  arrays: true,
  objects: true,
};

export const microservices = [
  ClientsModule.registerAsync([
    {
      name: TYPES.USER_SVC,
      useFactory: () => ({
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: UserProto,
          url: config.userSvc,
          loader,
        },
      }),
    },
    {
      name: TYPES.AUTH_SVC,
      useFactory: () => ({
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: AuthProto,
          url: config.authSvc,
          loader,
        },
      }),
    },
  ]),
];
