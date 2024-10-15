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

  // Add other auth-related methods here (signIn, signOut, etc.)
};
