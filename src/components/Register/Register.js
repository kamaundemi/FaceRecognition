import React from 'react';
// import SignIn.css from '.SignIn.css'
const Register = ({onRouteChange}) =>
{
	return (
	<main classname="pa4 black-80">
  <form classname="measure center">
    <fieldset id="sign_up" classname="ba b--transparent ph0 mh0">
      <legend classname="f4 fw6 ph0 mh0">Register</legend>
      <div classname="mt3">
        <label classname="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input classname="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="text" name="name"  id="name"/>
      </div>

      <div classname="mt3">
        <label classname="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input classname="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" name="email-address"  id="email-address"/>
      </div>
      <div classname="mv3">
        <label classname="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input classname="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
      </div>
      <label classname="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
    </fieldset>
    <div classname="">
      <input 
      onClick={() => onRouteChange('home')}
      classname="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
       type="submit"
        value="Register"/>
    </div>
    
  </form>
</main>
)
}

export default Register;