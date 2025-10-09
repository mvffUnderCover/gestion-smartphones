pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_PATH = "C:\\Users\\bachir\\Documents\\repo-git\\express_mongo\\docker-compose.yml"
        SONAR_AUTH_TOKEN = credentials('sonar-auth-token')
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
        stage('Analyse SonarQube') {
        steps {
            withCredentials([string(credentialsId: 'sonar-auth-token', variable: 'SONAR_AUTH_TOKEN')]) {
                bat '''
                    echo Lancement de l\'analyse SonarQube...
                    sonar-scanner ^
                    -Dsonar.projectKey=gestion-smartphones ^
                    -Dsonar.sources=. ^
                    -Dsonar.host.url=http://localhost:9000 ^
                    -Dsonar.login=%SONAR_AUTH_TOKEN%
                '''
            }
        }
    }


        stage('Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-identifiants', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        bat '''
                            echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                            docker push %DOCKER_USER%/gestion-smartphones-backend:latest
                            docker push %DOCKER_USER%/gestion-smartphones-frontend:latest
                        '''
                    }
                }
            }
        }

      stage('Déploiement (compose.yaml)') {
            steps {
                dir('.') {
                    bat '''
                        echo 🚀 Déploiement des conteneurs Docker...
                        docker-compose -f "%DOCKER_COMPOSE_PATH%" up -d --build

                        echo ✅ Vérification des conteneurs :
                        docker-compose -f "%DOCKER_COMPOSE_PATH%" ps
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
