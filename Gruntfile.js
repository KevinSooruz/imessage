// Ouvrir le terminal de commande : se placer dans le dossier et appuyer sur "Shift + clic droit" => ouvrir une fenêtre de commande

module.exports = function(grunt) {
  
  grunt.initConfig({
    
    less:{
        compile: {
            options: {
                compress: true,
                yuicompress: true
            },
            files:{
                "app/css/style.css": "app/css/style.less",
                "dist/app/css/style.css": "app/css/style.less"
            }
        }
    },
      
    babel: {
        options: {
            sourceMap: false
        },
        dist: {
            files: {
                "app/js/src/all/appController.js": "app/js/src/controllers/appController.jsx",
                "app/js/src/all/xhr.js": "app/js/src/services/xhr.jsx"
            }
        }
    },
      
    uglify: {
        options: {
            mangle: false
        },
        target: {
            files: {
                "app/js/app.js": ["app/js/src/all/xhr.js", "app/js/src/all/appController.js"],
                "dist/app/js/app.js" : "app/js/app.js"
            }
        }
    },
    
    minifyHtml: {
        options: {
            cdata: true
        },
        dist: {
            files: {
                "dist/index.php": "index.php"
            }
        }
    },
    
    watch: {
        style: {
            files: "app/css/**/*.less",
            tasks: ["less:compile"]
        },
        script: {
            files: "app/js/src/**/*.jsx",
            tasks: ["compile", "uglify"]
        },
        minifyHtml: {
            files: "index.php",
            tasks: ["minifyHtml"]
        }
    }
    
  });
  
  /*grunt.loadNpmTasks("grunt-browserify");*/ 
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-minify-html");
  grunt.loadNpmTasks("grunt-babel");
  
  // Il est conseiller de compiler avant de lancer "Watch"
  grunt.registerTask("compile", ["babel"]);
  grunt.registerTask("goUgly", ["uglify"]);
  grunt.registerTask("goLess", ["less:compile"]);
  grunt.registerTask("goMinify", ["minifyHtml"]);
  grunt.registerTask("goGrunt", ["less:compile", "watch"]);
  
};