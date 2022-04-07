module.exports = {
    apps: [
        {
            name: "Search Suggestions",
            script : "./index.js",
            // script: "node",
            // args: "index.js",
            instances: 1,
            autorestart: true,
            watch: false,
            exec_mode: "fork",
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
};