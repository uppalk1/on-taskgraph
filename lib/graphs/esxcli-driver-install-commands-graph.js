//Copyright © 2017 Dell Inc. or its subsidiaries. All Rights Reserved.

'use strict';

module.exports = {
    friendlyName: 'ESXi Driver Install',
    injectableName: 'Graph.ESXi.Driver.Install',
    tasks: [
        {
            label: 'setMaintenanceMode',
            taskDefinition: {
                friendlyName: "Ssh and put host into maintenance mode",
                injectableName: "Task.Set.Maintenance.Mode",
                implementsTask: 'Task.Base.Ssh',
                options: {
                    commands: "vim-cmd hostsvc/maintenance_mode_enter"
                },
                properties: {}
            }
        },
        {
            label: 'updateDriver',
            taskDefinition: {
                friendlyName: "install driver",
                injectableName: "Task.Install.Driver",
                implementsTask: 'Task.Base.Ssh',
                options: {
                    commands: "esxcli software vib update -v https://cdn.tinkertry.com/files/net-ixgbe_4.5.1-1OEM.600.0.0.2494585.vib --no-sig-check"
                },
                properties: {}
            },
            waitOn: {
                'setMaintenanceMode': 'succeeded'
            }
        },
        {
            label: 'reboot',
            taskDefinition: {
                friendlyName: "reboot",
                injectableName: "Task.Reboot.Node",
                implementsTask: 'Task.Base.Ssh',
                options: {
                    commands: "reboot",
                },
                properties: {}
            },
            waitOn: {
                'updateDriver': 'succeeded'

            }
        },
        {
            label: 'exitMaintenanceMode',
            taskDefinition: {
                friendlyName: "Ssh and exit host from maintenance mode",
                injectableName: "Task.Exit.Maintenance.Mode",
                implementsTask: 'Task.Base.Ssh',
                options: {
                    commands: "vim-cmd hostsvc/maintenance_mode_exit"
                },
                properties: {}
            },
            waitOn: {
                'reboot': 'succeeded'
            }
        },
    ]
};
