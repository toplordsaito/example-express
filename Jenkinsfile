pipeline {
    agent { label 'k8s' }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    sh 'helm upgrade --install myapp helm/helm-chart-node/ -n app -f helm/values.yml'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
