// Utilisez require pour importer le service d'authentification
const useAuthUser = require("../services/authService");

// Importez la méthode d'inscription depuis le service d'authentification
const { register, isLoggedIn, login, logout, tokens } = useAuthUser();

// Contrôleur pour gérer l'inscription des utilisateurs
const postRegister = async (req, res) => {
  console.log("c est arrivé coté authController");
  try {
    // Extrayez les données de la requête
    const { email, password, ...meta } = req.body;

    console.log("data ", email, password);
    // Appelez la méthode d'inscription avec les données de l'utilisateur
    const temp = await register({ email, password, ...meta });
    console.log("temp", temp);
    // Envoyez une réponse avec un message de succès
    res.status(200).json({ message: "Inscription réussie" });
  } catch (error) {
    // Gérez les erreurs et renvoyez un code d'erreur
    res
      .status(500)
      .json({ message: "Erreur lors de l'inscription : " + error });
  }
};

// Contrôleur pour gérer l'inscription des utilisateurs
const postLogin = async (req, res) => {
  console.log("login demandé coté authservice");
  try {
    // Extrayez les données de la requête
    const { email, password } = req.body;
    const data = await login({ email, password });
    console.log("***New Login***", tokens);

    res.status(200).json({ message: "Connexion réussie", tokens: tokens });
  } catch (error) {
    // Gérez les erreurs et renvoyez un code d'erreur
    res
      .status(500)
      .json({ message: "Erreur lors de l'la connexion : " + error });
  }
};

const getIsLoggedIn = async (req, res) => {
  console.log("isLoggedIn demandé coté authservice");
  try {
    const data = await isLoggedIn();

    res.status(200).json({
      message: "IsLogged renvoyé avec succes ",
      isloggedin: data,
      autre: data,
      tokens: tokens,
    });
  } catch (error) {
    // Gérez les erreurs et renvoyez un code d'erreur
    res
      .status(500)
      .json({ message: "Erreur lors de l' isLoggedIn : " + error });
  }
};

const getLogout = async (req, res) => {
  console.log("logout demandé coté authservice");
  try {
    const data = await logout();
    console.log("***New Logout***", tokens);
    const temp1 = await isLoggedIn();
    res.status(200).json({
      message: "logout renvoyé avec succes ",
      another: temp1,
      tokens: tokens,
    });
  } catch (error) {
    // Gérez les erreurs et renvoyez un code d'erreur
    res.status(500).json({ message: "Erreur lors de l' logout : " + error });
  }
};

// Exportez le contrôleur pour l'utilisation dans d'autres fichiers
module.exports = {
  postRegister,
  postLogin,
  getIsLoggedIn,
  getLogout,
};
