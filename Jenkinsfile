pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_PATH = "C:\\Users\\bachir\\Documents\\repo-git\\express_mongo\\docker-compose.yml"
        NOTIFY_EMAIL = "cmakhtar497@gmail.com"
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
                bat "docker-compose -f \"${DOCKER_COMPOSE_PATH}\" build"
                bat "docker-compose -f \"${DOCKER_COMPOSE_PATH}\" up -d"
            }
        }

        stage('Send Notification') {
            steps {
                script {
                    def result = currentBuild.currentResult
                    def statusIcon = result == 'SUCCESS' ? 'Impeccable' : 'Probléme'
                    def subject = "${statusIcon} Build ${result} : ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                    def body = """Bonjour Bachir,

                    Le build du job **${env.JOB_NAME} #${env.BUILD_NUMBER}** s’est terminé avec le statut : ${result}.

                    Détails du build : ${env.BUILD_URL}

                    -- Jenkins
                    """

                    echo "Envoi d’un e-mail (${result})..."
                    mail to: "${NOTIFY_EMAIL}", subject: subject, body: body
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
        }
    }
}
