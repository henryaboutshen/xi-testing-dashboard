/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
    projectId: 'bmi6jt',
    defaultCommandTimeout: 5000,
    viewportWidth: 1920,
    viewportHeight: 1080,

    e2e: {
    // eslint-disable-next-line no-unused-vars
        setupNodeEvents(on, config) {
            on('before:browser:launch', (browser, launchOptions) => {
                if (browser.name === 'chrome' && browser.isHeadless) {
                    launchOptions.args.push('--window-size=1920,1080');
                    launchOptions.args.push('--force-device-scale-factor=1');
                }
                if (browser.name === 'electron' && browser.isHeadless) {
                    launchOptions.preferences.width = 1920;
                    launchOptions.preferences.height = 1080;
                }
                if (browser.name === 'firefox' && browser.isHeadless) {
                    launchOptions.args.push('--width=1920');
                    launchOptions.args.push('--height=1080');
                }
                return launchOptions;
            });
        },
    },

    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
    },
});
