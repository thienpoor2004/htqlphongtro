const useAuth = () => {
    const token = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("user"));
    return {
      token,
      currentUser,
      isLoggedIn: !!token,
    };
  };
  
  export default useAuth;
  