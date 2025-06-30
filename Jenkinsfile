pipeline {
    agent any

    tools {
        nodejs "node18"
    }

    stages {
        stage('Clone') {
           steps {
                git credentialsId: '33e25830-f94f-402e-9938-11c9a938fcc5',
                    url: 'https://github.com/saurabhalp/webapp-jenkins.git',
                    branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        // stage('Test') {
        //     steps {
        //         sh 'npm test || true'
        //     }
        // }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['14552a86-a909-4608-88c0-f58a69eee362']) {
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
    }
}

        }
    }

