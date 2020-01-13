const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'plugin_name',
                message: 'What would you like to call your plugin? (No spaces, all lowercase, please)',
                default: this.appname,
            },
        ]);
    }

    writing() {
        this.log('Creating package.json...');
        const pkgJson = {
            name: `webvoxel-plugin-${this.answers.plugin_name}`,
            scripts: {
                dev: 'webpack --config webpack.dev.js',
                package: 'webpack --config webpack.prod.js',
            },
            devDependencies: {
                webpack: 'latest',
                'webpack-cli': 'latest',
                'webpack-merge': 'latest',
                'awesome-typescript-loader': 'latest',
                typescript: 'latest',
            },
            dependencies: {
                '@webvoxel/core': 'latest',
            },
        };

        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

        this.log('Creating webpack configs...');
        this.fs.copyTpl(
            this.templatePath('webpack.common.js'),
            this.destinationPath('webpack.common.js'),
            { name: this.answers.plugin_name },
        );

        this.fs.copy(
            this.templatePath('webpack.dev.js'),
            this.destinationPath('webpack.dev.js'),
        );

        this.fs.copy(
            this.templatePath('webpack.prod.js'),
            this.destinationPath('webpack.prod.js'),
        );
    }

    install() {
        this.installDependencies({
            npm: false,
            bower: false,
            yarn: true,
        });
    }
};
