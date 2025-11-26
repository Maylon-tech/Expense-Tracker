import { createContext, useState } from "react";

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    // Function to update user data
    const updateUser = (userData) => {
        setUser(userData)
    }

    // Function to clear user data (e.g., on logout)
    const clearUSer = () => {
        setUser(null)
    }

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUSer
            }}
        >
            { children }
        </UserContext.Provider>
    )


}

export default UserProvider