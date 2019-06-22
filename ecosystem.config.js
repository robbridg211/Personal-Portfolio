module.exports = {
  apps: [{
    name: 'Personal-Portfolio',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-218-252-151.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/deploy_key1.pem',
      ref: 'origin/master',
      repo: 'https://github.com/robbridg211/Personal-Portfolio.git',
      path: '/home/ubuntu/Personal-Portfolio',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
