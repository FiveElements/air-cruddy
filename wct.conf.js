module.exports = {
    expanded: true,
    persistent:  false,
    plugins: {
        local: {
            browsers: ['chrome']
        }
    },
    "istanbul": {
        "dir": "test/coverage-report",
        "reporters": ["text-summary", "lcov"],
        "include": [
            "**/air-cruddy.html",
            "**/air-cruddy-mixin.html",
            "**/air-cruddy-adapter-elasticsearch-mixin.html",
            "**/air-cruddy-elasticsearch-mixin.html"
        ],
        "exclude": [
            "/bower_components/**/*",
            "/demo/**/*",
            "/test/**/*"
        ]
    }
};