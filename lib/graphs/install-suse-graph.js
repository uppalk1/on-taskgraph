// Copyright 2015, EMC, Inc.

'use strict';

module.exports = {
    friendlyName: 'Install SuSE',
    injectableName: 'Graph.InstallSuSE',
    options: {
        defaults: {
            version: null,
	    // GOLIO: Is this correct? 
            repo: '{{api.server}}/suse/distribution/{{options.version}}/repo/oss/suse/x86_64'
        },
        'install-os': {
            schedulerOverrides: {
                timeout: 3600000 //1 hour
            }
        }
    },
    tasks: [
        {
            label: 'set-boot-pxe',
            taskName: 'Task.Obm.Node.PxeBoot',
            ignoreFailure: true
        },
        {
            label: 'reboot',
            taskName: 'Task.Obm.Node.Reboot',
            waitOn: {
                'set-boot-pxe': 'finished'
            }
        },
        {
            label: 'install-os',
            taskName: 'Task.Os.Install.SuSE',
            waitOn: {
                'reboot': 'succeeded'
            }
        }
    ]
};
