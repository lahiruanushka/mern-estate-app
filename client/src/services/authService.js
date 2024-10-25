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
  async google(userData) {
    try {
      const response = await fetch(`/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Google authentication failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Google authentication error:", error);
      throw error;
    }
  },
  async signOut() {
    try {
      const res = await fetch("/api/auth/signout", { method: "POST" });

      if (!res.ok) {
        throw new Error("Failed to sign out");
      }

      const data = await res.json();
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Sign-out failed:", error);
      return { success: false, error: error.message };
    }
  },
};
