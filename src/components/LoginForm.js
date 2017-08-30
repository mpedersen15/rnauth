import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, FormField, Spinner } from './common';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        };

        this.onButtonPress = this.onButtonPress.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLoginFail = this.onLoginFail.bind(this);
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <FormField 
                        label={'Email'} 
                        placeholder={'test@test.com'}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <FormField 
                        label={'Password'} 
                        placeholder={'password'}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry
                    />
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
                <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            </Card>
        );
    }

    renderButton() {
        if (this.state.loading){
            return <Spinner size={'large'}/>;
        }

        return <Button onPress={this.onButtonPress}>Login</Button> ;
    }

    onButtonPress() {
        this.setState({error: '', loading: true});

        const { email, password } = this.state;
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( res => {
            this.onLoginSuccess();
        })
        .catch(error => {
            switch(error.code){
                case 'auth/user-not-found':
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then( res => {
                        this.onLoginSuccess();
                    })
                    .catch(error => {
                        this.onLoginFail(error);
                    });

                    break;
                default:
                    this.onLoginFail(error);
                    break;
            }
        });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false
        });
    }

    onLoginFail(error){
        this.setState({
            error: error.message,
            loading: false
        });
    }
}

const styles = {
    inputStyles: {
        height: 50,
        flex: 1
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;