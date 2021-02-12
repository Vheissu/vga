// PM2 configuration

module.exports = {
    apps: [
      {
        name: 'neblio-api',
        script: 'api.ts',
        exec_mode: 'fork',
        interpreter: 'node',
        interpreter_args: '--require ts-node/register --require tsconfig-paths/register',
        ignore_watch: ['node_modules'],
        env: {
          NODE_ENV: 'development'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      }
    ]
  };