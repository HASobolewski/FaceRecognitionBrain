import React, { Component } from 'react';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			name: '',
			password: ''
		};
	}
	onEmailChange = (event) => this.setState({email: event.target.value});
	onNameChange = (event) => this.setState({name: event.target.value});
	onPasswordChange = (event) => this.setState({password: event.target.value});
	onSubmitRegister = () => fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.email,
				name: this.state.name,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		});
	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className='pa4 black-80'>
					<div className='measure'>
						<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
							<legend className='f1 fw6 ph0 mh0'>Register</legend>
							<div className='mt3'>
								<label className='db fw6 lh-copy f6' htmlFor='name'>Name</label>
								<input className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' type='text' name='name' id='name' onChange={this.onNameChange} />
							</div>
							<div className='mt3'>
								<label className='db fw6 lh-copy f6' htmlFor='email-address'>Email</label>
								<input className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' type='email' name='email-address' id='email-address' onChange={this.onEmailChange} />
							</div>
							<div className='mv3'>
								<label className='db fw6 lh-copy f6' htmlFor='password'>Password</label>
								<input className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' type='password' name='password' id='password' onChange={this.onPasswordChange} />
							</div>
						</fieldset>
						<div className=''>
							<input className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' type='submit' value='Register' onClick={this.onSubmitRegister} />
						</div>
						<div className='lh-copy mt3'>
							<p className='f6 link dim black db pointer' onClick={() => onRouteChange('signin')} >Sign In</p>
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default Register;