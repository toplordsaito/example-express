pipeline {
    agent {
        kubernetes {
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: docker
    image: docker:20.10.3-dind
    command:
    - dockerd
    - --host=unix:///var/run/docker.sock
    - --host=tcp://0.0.0.0:2375
    - --storage-driver=overlay2
    tty: true
    securityContext:
        privileged: true
  - name: helm
    image: lachlanevenson/k8s-helm:v3.5.0
    command:
    - cat
    tty: true
  - name: java-node
    image: timbru31/java-node:11-alpine-jre-14
    command:
    - cat
    tty: true
'''
        }
    }

    environment {
        ENV_NAME = "${BRANCH_NAME}"
        SCANNER_HOME = tool 'sonarqube-scanner'
        PROJECT_KEY = 'chomchob-app'
        PROJECT_NAME = 'chomchob-app'
        TAG_IMAGE = "${ENV_NAME}-${currentBuild.number}"
    }

    stages {
        stage('Clone ratings source code') {
            steps {
                container('jnlp') {
                    script {
                        git branch: "${BRANCH_NAME}", url: 'https://github.com/toplordsaito/example-express.git'
                    }
                }
            }
        }

        stage('Sonarqube Scanner') {
            steps {
                container('java-node') {
                    script {
                        withSonarQubeEnv('sonarqube') {
                        sh '''${SCANNER_HOME}/bin/sonar-scanner \
                        -D sonar.projectKey=${PROJECT_KEY} \
                        -D sonar.projectName=${PROJECT_NAME} \
                        -D sonar.projectVersion=${BRANCH_NAME}-${BUILD_NUMBER} \
                        -D sonar.source=./
                        '''
                        }
                        timeout(time: 1, unit: 'MINUTES') {
                            def qg = waitForQualityGate()
                            if (qg.status != 'OK') {
                                error "Pipeline aborted due to quality gate failure: ${qg.status}"
                            }
                        }
                    }
                }
            }
        }

        stage('Build Docker Image and push') {
            steps {
                container('docker') {
                    script {
                        docker.withRegistry('https://core-harbor.chomchob.waruwat.work', 'harbor') {
                            docker.build("chomchob/example-node:${TAG_IMAGE}").push()
                        }
                    }
                }
            }
        }

        stage('Deploy with helm chart') {
            steps {
                container('helm') {
                    script {
                        withKubeConfig([credentialsId: 'kubeconfig']) {
                            sh "helm upgrade --install myapp helm/helm-chart-node/ -n ${ENV_NAME} -f helm/values/values-${ENV_NAME}.yml --set image.tag=${TAG_IMAGE}"
                        }
                    }
                }
            }
        }
    }
}
