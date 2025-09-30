// import App from './app';
const App = require('./app').default;

async function main() {
    const app = new App();
    await app.start();
}

main().catch(err => {
    console.error('Fatal error starting app:', err);
    process.exit(1);
});
