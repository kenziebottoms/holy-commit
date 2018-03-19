module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            files: {
                src: "assets/js/main.js",
                dest: "dist/bundle.js",
            },
            options: {
                transform: ["hbsfy"],
            }
        },
        jshint: {
            files: ["assets/js/**/*.js"],
            options: {
                predef: ["document", "console", "$", "alert"],
                esnext: true,
                globalstrict: true,
                globals: {},
                browserify: true,
                loopfunc : true
            },
        },
        sass: {
            dist: {
                files: {
                    "assets/css/style.css" : "assets/sass/style.scss",
                },
            },
        },
        watch: {
            javascripts: {
                files: ["assets/js/**/*.js"],
                tasks: ["jshint", "browserify"],
            },
            sass: {
                files: ["assets/sass/**/*.scss"],
                tasks: ["sass"],
            },
            hbs: {
                files: ["assets/templates/**/*.hbs"],
                tasks: ["browserify"]
            }
        },
    });

    require("matchdep")
        .filter("grunt-*")
        .forEach(grunt.loadNpmTasks);
    
    grunt.registerTask("default", ["jshint", "sass", "browserify", "watch"]);
};