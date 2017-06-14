module.exports = {
  instagram: {
    loginUrl: 'https://api.instagram.com/oauth/authorize/',
    accessTokenURL: 'https://api.instagram.com/oauth/access_token',
    clientId: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    redirect_uri: 'http://localhost:8000/oauth/instagram',
    response_type: 'code',
    getLoginUrl() {
      return `${this.loginUrl}?client_id=${this.clientId}&redirect_uri=${this.redirect_uri}&response_type=${this.response_type}`;
    }
  }
};
