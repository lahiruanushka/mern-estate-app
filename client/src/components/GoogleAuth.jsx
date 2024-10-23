import { Transition } from "@headlessui/react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Sign in with Google
      const result = await signInWithPopup(auth, provider);

      const name = result.user.displayName;
      const email = result.user.email;
      const photo = result.user.photoURL;

      // Send user data to backend for further authentication/registration
      const response = await authService.google({ name, email, photo });

      // Dispatch the user data to Redux store
      dispatch(signInSuccess(response));

      // Navigate to the homepage
      navigate("/");
    } catch (error) {
      console.error("Google authentication failed", error);
      dispatch(
        signInFailure(
          "We were unable to sign you in with Google. Please try again."
        )
      );
    }
  };

  return (
    <Transition
      appear
      show={true}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center w-full justify-center py-2 px-4 bg-white text-gray-700 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
      >
        <FcGoogle size={24} className="mr-2" />
        Continue with Google
      </button>
    </Transition>
  );
};
