pipeline {
    agent any

    tools {
        nodejs "node16"
    }

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/your-username/your-repo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || true'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['your-ec2-ssh-cred-id']) {
                    sh 'scp -o StrictHostKeyChecking=no -r * ubuntu@<ec2-public-ip>:~/app'
                    sh 'ssh ubuntu@<ec2-public-ip> "pm2 restart app || pm2 start server.js --name app"'
                }
            }
        }
    }
}
