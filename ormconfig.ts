// import env from './src/env';

export = [
  {
    host: 'walpola.tk',
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'Squak2992',
    migrations: ['src/migrations/database/*.ts'],
    cli: {
      migrationsDir: 'src/migrations/database',
    },
    extra: {
      ssl: true,
    },
    migrationsTableName: 'MigrationHistory',
    synchronize: false,
    logging: 'all',
    name: 'CreateDatabase',
  },
  {
    host: 'walpola.tk',
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'Squak2992',
    database: 'voltage-metrics',
    migrations: ['src/migrations/schema/*.ts'],
    cli: {
      migrationsDir: 'src/migrations/schema',
    },
    extra: {
      ssl: true,
    },
    migrationsTableName: 'MigrationHistory',
    synchronize: false,
    logging: 'all',
    name: 'CreateSchema',
  },
  {
    host: 'walpola.tk',
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'Squak2992',
    database: 'voltage-metrics',
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: ['src/migrations/*.ts'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    extra: {
      ssl: true,
    },
    schema: 'csone',
    migrationsTableName: 'MigrationHistory',
    synchronize: false,
    logging: 'all',
    name: 'default',
  },
];
