import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Header, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedIn: null
        };
    }


    componentWillMount() {
        const config = {
            apiKey: "AIzaSyDi8jA0tjjDNTbvs4Fcht2Jqh7ja9gpTyw",
            authDomain: "rn-auth-254bd.firebaseapp.com",
            databaseURL: "https://rn-auth-254bd.firebaseio.com",
            projectId: "rn-auth-254bd",
            storageBucket: "rn-auth-254bd.appspot.com",
            messagingSenderId: "554408185839"
        };
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged((user) => {
            console.log('firebase state changed!', user);
            if (user) {
                this.setState({ loggedIn: true });
            }else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderPage() {
        switch (this.state.loggedIn) {
            case true: 
                console.log('Yes, we are logged in');
                return (
                    <Card>
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log Out
                            </Button>
                        </CardSection>
                    </Card>
                );
                break;
            case false:
                return <LoginForm />;
                break;
            default:
                return (
                    <CardSection>
                        <Spinner />
                    </CardSection>
                );
                break;
        }
    }

    render() {
        return (
            <View>
                <Header headerText={'Auth'} />
                {/* <LoginForm /> */}
                {this.renderPage()}
            </View>
            
        );
    }

}

export default App;
