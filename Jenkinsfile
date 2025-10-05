pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_PATH = "C:\Users\bachir\Documents\repo-git\express_mongo\docker-compose.yml"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/mvffUnderCover/gestion-smartphones.git'
            }
        }

        stage('Install Backend') {
            steps {
                dir('gestion-smartphone-backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Install & Build Frontend') {
            steps {
                dir('gestion-smartphone-frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Docker Build & Up') {
            steps {
                bat "docker-compose -f ${DOCKER_COMPOSE_PATH} build"
                bat "docker-compose -f ${DOCKER_COMPOSE_PATH} up -d"
            }
        }

    }

    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
