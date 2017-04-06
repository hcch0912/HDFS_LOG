import React from 'react';

class Login extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
    $(document)
    .ready(function() {
      $('.ui.form')
        .form({
          fields: {
            email: {
              identifier  : 'email',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your e-mail'
                },
                {
                  type   : 'email',
                  prompt : 'Please enter a valid e-mail'
                }
              ]
            },
            password: {
              identifier  : 'password',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your password'
                },
                {
                  type   : 'length[6]',
                  prompt : 'Your password must be at least 6 characters'
                }
              ]
            }
          }
        })
      ;
    })
  ;
    }
    render(){
        return(
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui teal image header">
                    <img src="assets/images/logo.png" className="image" />
                    <div className="content">
                        Log-in to your account
                    </div>
                    </h2>
                    <form className="ui large form">
                    <div className="ui stacked segment">
                        <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input type="text" name="email" placeholder="E-mail address" />
                        </div>
                        </div>
                        <div classNameName="field">
                        <div classNameName="ui left icon input">
                            <i classNameName="lock icon"></i>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        </div>
                        <div classNameName="ui fluid large teal submit button">Login</div>
                    </div>

                    <div classNameName="ui error message"></div>

                    </form>

                    <div classNameName="ui message">
                    New to us? <a href="#">Sign Up</a>
                    </div>
                </div>
                </div>
        );
    }
}

export default Login;