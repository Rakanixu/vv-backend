node {

        env.GIT_BRANCH = "origin/${BRANCH_NAME}"
        env.BRANCH_NAME = "${BRANCH_NAME}"
        
        stage 'Checkout'
        checkout scm

        stage 'Build'

        sh '''#!/bin/bash
        
        docker run -e GIT_BRANCH="$GIT_BRANCH" -v /var/run/docker.sock:/var/run/docker.sock -v $PWD:/src/ ecid/toolkit build.sh

        '''

        stage 'Push'
        
        sh    '''#!/bin/bash
                        
                docker run -e GIT_BRANCH="$GIT_BRANCH" -v /var/run/docker.sock:/var/run/docker.sock -v $PWD:/src/ "ecid/toolkit" push-all.sh

            '''
}
