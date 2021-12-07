import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        return (
            <div className="app">

                {/* Header */}
                <AppHeader />

                <main>

                    {/* Random character */}
                    <ErrorBoundary>
                        <RandomChar />
                    </ErrorBoundary>

                    <div className="char__content">

                        {/* Characters list */}
                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected} />
                        </ErrorBoundary>

                        {/* Character info */}
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectedChar} />
                        </ErrorBoundary>

                    </div>

                    <img className="bg-decoration" src={decoration} alt="vision" />

                </main>
            </div>
        )
    }
}

export default App;