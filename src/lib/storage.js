// Local Storage wrapper
export const localStorage = {
  get: (key) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting from localStorage:", error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Error setting localStorage:", error);
      return false;
    }
  },

  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing from localStorage:", error);
      return false;
    }
  },
};

// Session Storage wrapper
export const sessionStorage = {
  get: (key) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting from sessionStorage:", error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Error setting sessionStorage:", error);
      return false;
    }
  },

  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing from sessionStorage:", error);
      return false;
    }
  },
};

// Cookie wrapper
export const cookies = {
  get: (name) => {
    try {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? JSON.parse(decodeURIComponent(match[2])) : null;
    } catch (error) {
      console.error("Error getting cookie:", error);
      return null;
    }
  },

  set: (name, value, days = 7) => {
    try {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie =
        name +
        "=" +
        encodeURIComponent(JSON.stringify(value)) +
        "; expires=" +
        expires +
        "; path=/";
      return true;
    } catch (error) {
      console.error("Error setting cookie:", error);
      return false;
    }
  },

  remove: (name) => {
    try {
      document.cookie =
        name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      return true;
    } catch (error) {
      console.error("Error removing cookie:", error);
      return false;
    }
  },
};
