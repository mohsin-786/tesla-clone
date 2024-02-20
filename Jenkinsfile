pipeline {
    agent any
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }
    stages {
        stage('clean workspace') {
            steps{
                cleanWs()
            }
        }
        stage('Checkout from Git') {
            steps{
                git branch: 'main', url: 'https://github.com/mohsin-786/tesla-clone.git'
            }
        }
        stage('Sonarqube Analysis') {
            steps{
                withSonarQubeEnv('sonar-server') {
                    sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=Tesla\
                    -Dsonar.projectKey=Tesla'''
                }
            }
        }
        // stage("quality gate"){
        //   steps {
        //         script {
        //             waitForQualityGate abortPipeline: false, credentialsId: 'sonar-token'
        //         }
        //     }
        // }
        // stage('Install Dependencies') {
        //     steps {
        //         sh "npm install"
        //     }
        // }
        // stage('OWASP FS SCAN') {
        //     steps {
        //         dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
        //         dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
        //     }
        // }
        // stage('TRIVY FS SCAN') {
        //     steps {
        //         sh 'trivy fs . > trivyFS.txt'
        //     }
        // }

        stage("Docker Build & Push"){
            steps{
                script{
                  withDockerRegistry(credentialsId: 'dockerhub'){
                      sh 'docker build -t mohsin01/tesla-clone:${BUILD_NUMBER} .'
                      sh "docker push mohsin01/tesla-clone:${BUILD_NUMBER}"
                    }
                }
            }
        }
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/mohsin-786/manifests-k8s.git'
            }
        }
        stage('Update Deployment File') {
            environment {
                GIT_REPO_NAME = "manifests-k8s"
                GIT_USER_NAME = "mohsin-786"
            }
            steps {
                script {
                    withCredentials([string(credentialsId: 'gitwa', variable: 'GITHUB_TOKEN')]) {
                      sh '''
                          git config user.email "mohsinabedeen78@gmail.com"
                          git config user.name "mohsin-786"
                          sed -i "s|image: .*|image: $NEW_IMAGE_NAME|" tesla-clone-manifests/tesla-manifest.yml
                          cd tesla-clone-manifests/tesla-manifest.yml
                          git add .
                          git commit -m 'Update deployment image to mohsin01/tesla-clone:${BUILD_NUMBER}'
                          git push https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:main
                         '''
                    }
                }
            }
        }
    }
}
