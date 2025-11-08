import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../redux/authSlice"; // Assuming alias is correct
import { USER_API_ENDPOINT } from "../utils/data"; // Assuming alias is correct

/**
 * A component that logs the user out and redirects.
 * When rendered (e.g., by navigating to '/logout'), it
 * runs the logout logic and navigates to the homepage.
 */
const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Define the async logout function
        const logoutHandler = async () => {
            try {
                const res = await axios.post(
                    `${USER_API_ENDPOINT}/logout`,
                    null, // No body data
                    { withCredentials: true }
                );

                if (res?.data?.success) {
                    dispatch(setUser(null));
                    navigate("/");
                    toast.success(res.data.message);
                } else {
                    // Handle cases where logout API fails but doesn't throw
                    console.error("Error logging out:", res.data);
                    toast.error(res?.data?.message || "Logout failed");
                    navigate("/"); // Navigate home even if it fails
                }
            } catch (error) {
                // Handle network or other errors
                console.error("Axios error:", error);
                if (error.response) {
                    console.error("Error response:", error.response.data);
                }
                toast.error(error?.response?.data?.message || "Error logging out. Please try again.");
                navigate("/"); // Navigate home on catch
            }
        };

        // Call the logout function when the component mounts
        logoutHandler();

    }, [dispatch, navigate]); // Add dependencies for React's linter

    // Optionally, render a loading message
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <p className="text-xl font-semibold">Logging out...</p>
        </div>
    );
};

export default Logout;