import { useState, FormEvent} from "react"
import { useAuthSession } from "./AuthSessionContext"
import { Navigate } from "react-router-dom"
import styles from '../utils.module.css'
import { supabase } from "../supabaseClient"

export const Auth = () => {
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState("")
	const { session } = useAuthSession()
// this is the state that will hold the loading state, the email and the session

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			setLoading(true)
			const { error } = await supabase.auth.signInWithOtp({ email })
			if(error) throw error
			alert("Check your email for the login link!")
		} catch (error){
			alert(error)
		} finally {
			setLoading(false)
		}
	} // this is the function that will handle the login

	if(session){
		return <Navigate to="/" />
	} // this will redirect the user to the home page if they are already logged in

	return (
		<div className={styles.centeredFlex}>
			<div>
				<h1>Notes App</h1>
				<p>Sign in via magic link with your email</p>
				{loading ? ("Sending magic link...") : (
					<form onSubmit={handleLogin}>
						<label htmlFor="email">Email: </label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder="Your email"
						/>
						<button>
							Send magic link
						</button>
					</form>
				)}
			</div>
		</div>
	) // this is the jsx that will be rendered

}