import { AsyncStorage } from 'react-native';

const LoginController = {
  login: async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/auth');
      const data = await response.json();
        if (response.success){
          AsyncStorage.setItem('token', true)
          AsyncStorage.setItem('user', response.content)
          return response.content
        } else {
          return false
        }
    } catch (error) {
      // Handling any errors that occurred during login
      throw new Error('Login failed. Please try again.');
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
    } catch (error) {
      throw new Error('Logout failed. Please try again.');
    }
  },

  isAuthenticated: async () => {
    try {
      // Checking if the access token exists in AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');

      // Returning true if the access token exists, indicating the user is authenticated
      return accessToken !== null;
    } catch (error) {
      // Handling any errors that occurred during authentication check
      throw new Error('Authentication check failed. Please try again.');
    }
  }
};

export default LoginController;
