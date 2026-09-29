import { useState } from 'react'

export default function Signin({ onSignIn }) {
    const [error, setError] = useState('')

    const submitSignIn = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const credentials = {
            email: formData.get('email').trim(),
            password: formData.get('password'),
        }

        if (!onSignIn(credentials)) {
            setError('The email or password is incorrect.')
        }
    }

    return (
        <main className="signin-page">
            <section className="signin-panel" aria-labelledby="signin-title">
                <div className="signin-brand">
                    <span className="club-mark-icon" aria-hidden="true">C</span>
                    <span className="club-mark-name">COUNTRY<br />CLUB</span>
                </div>
                <p className="eyebrow">ADMINISTRATOR ACCESS</p>
                <h1 id="signin-title">Sign in</h1>
                <p className="signin-copy">Use your administrator account to manage club memberships.</p>
                <form className="signin-form" onSubmit={submitSignIn}>
                    <label>
                        Email address
                        <input name="email" type="email" placeholder="admin@countryclub.local" autoComplete="username" required autoFocus />
                    </label>
                    <label>
                        Password
                        <input name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required />
                    </label>
                    {error && <p className="signin-error" role="alert">{error}</p>}
                    <button className="submit-button signin-submit" type="submit">Sign in</button>
                </form>
            </section>
        </main>
    )
}