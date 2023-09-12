import { createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
export const ProductContext = createContext()

export const ContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({})
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
            console.log(user)
        } else {

            console.log("user yo'q")
        }
    });


    let data = {
        setIsLoading,
        isLoading,
        user
    }

    return <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
}