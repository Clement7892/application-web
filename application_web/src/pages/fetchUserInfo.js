import axios from "axios";

const fetchUserInfo = async (token) => {
  try {
    const response = await axios.get(
      `https://application-web-backend.onrender.com/api/v1/auth/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export default fetchUserInfo;
