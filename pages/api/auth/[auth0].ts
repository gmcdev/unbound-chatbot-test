import { handleAuth, handleLogout } from '@auth0/nextjs-auth0';

export default handleAuth({
  // TODO: fix this TypeScript error
  async logout(req, res) {
    await handleLogout(req, res, {
      returnTo: '/welcome',
    });
  },
});
