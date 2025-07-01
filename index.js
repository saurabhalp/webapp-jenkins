const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>CI/CD Pipeline</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          background-color: #f4f4f4;
        }
        h1, h2 {
          color: #333;
        }
        code {
          background-color: #eee;
          padding: 2px 4px;
          font-family: monospace;
          display: block;
          white-space: pre-wrap;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .section {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        ul {
          padding-left: 20px;
        }
      </style>
    </head>
    <body>
      <h1>CI/CD Pipeline using Jenkins</h1>

      <div class="section">
        <h2>Objective</h2>
        <p>Automate deployment of a Node.js application from GitHub to an AWS EC2 instance using a Jenkins pipeline.</p>
      </div>

      <div class="section">
        <h2>Steps Performed</h2>
        <ul>
          <li>Installed Jenkins on an AWS EC2 instance</li>
          <li>Connected Jenkins with GitHub repository</li>
          <li>Created a declarative Jenkinsfile with build, install, and deploy stages</li>
          <li>Used SSH credentials and <code>scp</code> to deploy the app on the EC2 target server</li>
          <li>Integrated <code>pm2</code> to manage the Node.js app process</li>
        </ul>
      </div>

      <div class="section">
        <h2>Implementation (Jenkinsfile)</h2>
        <code>
pipeline {
    agent any
    tools {
        nodejs "node18"
    }
    stages {
        stage('Clone') {
            steps {
                git credentialsId: '***',
                    url: 'https://github.com/saurabhalp/webapp-jenkins.git',
                    branch: 'main'
            }}
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }    }
        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['***']) {
                    sh '''
                        echo Deploying to EC2...
                        scp -o StrictHostKeyChecking=no -r Jenkinsfile index.js jenkins-demo-terraform node_modules package-lock.json package.json ubuntu@13.201.186.125:~/app
                        ssh -o StrictHostKeyChecking=no ubuntu@52.66.160.159 '
                            cd ~/app &&
                            npm install &&
                            pm2 restart app || pm2 start index.js --name app
                        '
                    '''
    }
}}}}
        </code>
      </div>

      <div class="section">
        <h2>CI/CD Workflow</h2>
        <p>This project uses Jenkins pipelines to automate deployments triggered by code pushes.</p>
      </div>

      <div class="section">
        <h2>Functional Details</h2>
        <ul>
          <li>Automatically pulls latest code from GitHub on push</li>
          <li>Installs dependencies and deploys app to target EC2</li>
          <li>Uses <code>pm2</code> to ensure the app is restarted or started cleanly</li>
        </ul>
      </div>

      <div class="section">
        <h2>Non-Functional Details</h2>
        <ul>
          <li>Reduces manual deployment effort</li>
          <li>Provides extensibility for rollback or test stages</li>
          <li>Uses secure credential management via Jenkins</li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => console.log(`App running on port ${port}`));
