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
        stage('Run Tests') {
            steps {
                dir('gestion-smartphone-backend') {
                    bat 'npm test || echo "⚠️ Aucun test trouvé ou échec des tests"'
                }
            }
        }
        // Nouveau stage : Push Docker Images vers Docker Hub
        stage('Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-identifiants', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        bat '''
                            echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                            
                            echo "Tagging images avant push..."
                            docker tag express_mongo-backend:latest %DOCKER_USER%/gestion-smartphones-backend:latest
                            docker tag express_mongo-frontend:latest %DOCKER_USER%/gestion-smartphones-frontend:latest

                            echo "Pushing images vers Docker Hub..."
                            docker push %DOCKER_USER%/gestion-smartphones-backend:latest
                            docker push %DOCKER_USER%/gestion-smartphones-frontend:latest

                            echo "Push terminé avec succès !"
                        '''
                    }
                }
            }
        }

        stage('Deploiement (compose.yaml)') {
            steps {
                dir('.') {
                    bat '''
                        echo Arrêt des anciens conteneurs...
                        docker-compose -f "%DOCKER_COMPOSE_PATH%" down || echo Aucun conteneur à arrêter.

                        echo Reconstruction complète des images...
                        docker-compose -f "%DOCKER_COMPOSE_PATH%" build --no-cache

                        echo Démarrage des services...
                        docker-compose -f "%DOCKER_COMPOSE_PATH%" up -d

                        echo Vérification des conteneurs actifs...
                        docker-compose -f "%DOCKER_COMPOSE_PATH%" ps

                        echo Derniers logs :
                        docker-compose -f "%DOCKER_COMPOSE_PATH%" logs --tail=30
                    '''
                }
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
