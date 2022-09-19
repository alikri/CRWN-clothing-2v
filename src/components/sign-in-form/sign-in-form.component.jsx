import { useState } from "react"; 
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {SignInContainer, ButtonsContainer} from "./sign-in-form.styles";

// import { UserContext } from "../../contexts/user.context"; we centrilizing this feature via useEffect() in user.context.jsx

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormField = {
	email: "",
	password: ""
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormField);
	const { email, password } = formFields;

	// const { setCurrentUser } = useContext(UserContext); we centrilizing this feature via useEffect() in user.context.jsx

	console.log(formFields);

	const resetFormFields = () => {
		setFormFields(defaultFormField);
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
		// setCurrentUser(user);
		// await createUserDocumentFromAuth(user);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(email, password);
			// setCurrentUser(user); we centrilizing this feature via useEffect() in user.context.jsx
			resetFormFields();
			
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("incorrect password for email");
					break;
				case "auth/user-not-found":
					alert("no user associated with this email");
					break;
				default:
					console.log(error);
			}
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		
		setFormFields({ ...formFields, [name]: value });
	}

	return (
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email} />
			
				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password} />
				
				<ButtonsContainer>
					<Button type="submit" >Sign In</Button>
					<Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} >Google Sign In</Button>
				</ButtonsContainer>
				
			</form>
		</SignInContainer>
	)
}

export default SignInForm;
