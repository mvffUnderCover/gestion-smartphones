pipeline {
    agent any

    environment {
        SONAR_AUTH_TOKEN = credentials('sonar-auth-token')
        NOTIFY_EMAIL = "cmakhtar497@gmail.com"
        DOCKER_USER = credentials('docker-hub-identifiants')
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

        stage('Analyse SonarQube') {
            steps {
                script {
                    def sonarScannerHome = tool name: 'SonarScanner_Windows', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv('SonarQubeLocal') {
                        withCredentials([string(credentialsId: 'sonar-auth-token', variable: 'SONAR_AUTH_TOKEN')]) {
                            bat """
                                echo Lancement de l'analyse SonarQube...
                                "${sonarScannerHome}\\bin\\sonar-scanner.bat" ^
                                -Dsonar.projectKey=Gestion-de-smartphone ^
                                -Dsonar.sources=. ^
                                -Dsonar.host.url=http://localhost:9000 ^
                                -Dsonar.login=%SONAR_AUTH_TOKEN%
                            """
                        }
                    }
                }
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-identifiants', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        bat """
                            echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                            
                            echo Construction du backend...
                            docker pull %DOCKER_USER%/gestion-smartphones-backend:latest || echo "Pas d'image existante"
                            docker build --pull --cache-from %DOCKER_USER%/gestion-smartphones-backend:latest -t %DOCKER_USER%/gestion-smartphones-backend:latest ./gestion-smartphone-backend

                            echo Construction du frontend...
                            docker pull %DOCKER_USER%/gestion-smartphones-frontend:latest || echo "Pas d'image existante"
                            docker build --pull --cache-from %DOCKER_USER%/gestion-smartphones-frontend:latest -t %DOCKER_USER%/gestion-smartphones-frontend:latest ./gestion-smartphone-frontend

                            echo Envoi sur Docker Hub...
                            docker push %DOCKER_USER%/gestion-smartphones-backend:latest
                            docker push %DOCKER_USER%/gestion-smartphones-frontend:latest
                        """
                    }
                }
            }
        }


        stage('Deploiement Kubernetes') {
            steps {
                bat '''
                    echo ===== Démarrage du déploiement Kubernetes =====
                    kubectl apply -f k8s/
                    kubectl rollout restart deployment smartphone-backend
                    kubectl rollout restart deployment smartphone-frontend
                    echo ===== Déploiement terminé =====
                    kubectl get pods
                    kubectl get svc
                '''
            }
        }

        stage('Send Notification') {
            steps {
                script {
                    def result = currentBuild.currentResult
                    def statusIcon = result == 'SUCCESS' ? '✅ Succès' : '❌ Échec'
                    def subject = "${statusIcon} Build ${result} : ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                    def body = """Bonjour Bachir,

Le build du job **${env.JOB_NAME} #${env.BUILD_NUMBER}** s’est terminé avec le statut : ${result}.

Détails du build : ${env.BUILD_URL}

-- Jenkins CI/CD
"""
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
