// Utilisez require pour importer les modules

const { useSupabase } = require("../supabase");

let user = null;
let tokens = { accesstoken: null, refreshtoken: null };

function useAuthUser() {
  const { supabase } = useSupabase();

  const updateAuthState = (event, session) => {
    if (event === "SIGNED_OUT" || event === "USER_DELETED") {
      user = null;
      tokens.accessToken = null;
      tokens.refreshToken = null;
    } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
      user = session.user;
      tokens.accesstoken = session.access_token;
      tokens.refreshtoken = session.refresh_token;
    }
  };

  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    user = data.user;

    if (error) throw error;
    return user;
  };

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signIn({ provider });
    if (error) throw error;
    return user;
  };

  // Écoute les changements d'état d'authentification
  supabase.auth.onAuthStateChange(updateAuthState);

  // Autres fonctions de gestion de l'authentification...

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
    user = null; // Réinitialiser l'utilisateur à null lors de la déconnexion
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const register = async ({ email, password, ...meta }) => {
    const { data, error } = await supabase.auth.signUp(
      { email, password },

      {
        data: meta,
      }
    );
    user = data.user;
    if (error) {
      console.log(error);
    }
    return user;
  };
  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data);
    if (error) throw error;
    return user;
  };
  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.api.resetPasswordForEmail(
      email
    );
    if (error) throw error;
    return user;
  };

  const resetPassword = async (accessToken, newPassword) => {
    const { user, error } = await supabase.auth.api.updateUser(accessToken, {
      password: newPassword,
    });
    if (error) throw error;
    return user;
  };

  return {
    user,
    tokens,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword,
  };
}

module.exports = useAuthUser;
