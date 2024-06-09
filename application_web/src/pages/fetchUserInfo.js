import axios from "axios";

const fetchUserInfo = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/v1/auth/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.user; // Retourne les informations de l'utilisateur
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error; // Lance une exception en cas d'erreur
  }
};

export default fetchUserInfo;
