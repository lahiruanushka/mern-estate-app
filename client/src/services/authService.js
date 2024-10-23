export const authService = {
  async signUp(userData) {
    try {
      const response = await fetch(`api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign up failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  },
  async signIn(userData) {
    try {
      const response = await fetch(`api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign in failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  },
};
