export const userService = {
  async updateUser(userId, userData) {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      return await response.json(); // Return the updated user data
    } catch (error) {
      console.error("Error updating user:", error);
      throw error; // Rethrow error for further handling
    }
  },
  async deleteUser(userId) {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      return await response.json(); // Returns the success message
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
  async getUser(userId) {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user");
      }

      return await response.json(); // Return the user data
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
};
