const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdi-ldn-project-1';
const env = process.env.NODE_ENV || 'development';
const sessionSecret = process.env.SESSION_SECRET || 'YghT5s617/1{%sDt';

module.exports = { port, env, dbURI, sessionSecret };
