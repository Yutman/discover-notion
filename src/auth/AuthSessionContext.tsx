import { supabase } from "../supabaseClient"
import { Session } from "@supabase/supabase-js"
import { createContext, ReactNode, useState, useEffect, useContext } from "react"

type AuthSessionContextValue = {
	session: Session | null;
	loading: boolean;
} // this is the type for the AuthSessionContextValue

const AuthSessionContext = createContext<AuthSessionContextValue>({} as AuthSessionContextValue)


type AuthSessionProviderProps = {
	children: ReactNode
} // this is the type for the AuthSessionProviderProps

export const AuthSessionProvider = ({children}: AuthSessionProviderProps) => {
	const [ session, setSession ] = useState<Session | null>(null)
	const [ loading, setLoading ] = useState(true);
	// this is the state that will hold the session and the loading state

	useEffect(() => {
		const auth = async () => {
			const {data, error } = await supabase.auth.getSession()
			if(data.session){
				setSession(data.session)
				setLoading(false)
			} else {
				console.log(error)
			}
		}
		auth()
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
			setLoading(false)
		})
	}, []) // this is the effect that will run on mount

	return (
		<AuthSessionContext.Provider value={{ session, loading }}>
			{children}
		</AuthSessionContext.Provider>
	)
} // this is the provider that will wrap the app

export const useAuthSession = () => useContext(AuthSessionContext)  
// this is the custom hook that will be used to consume the context