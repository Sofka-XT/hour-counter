
import Timer from './Timer'
import React, { Component } from 'react'

class App extends Component {

    render() {
        let OPTIONS = { prefix: 'seconds elapsed!', delay: 100 }
        return (
            <div>
                <h2>Hour Counter</h2>
                <div>
                    <Timer options={OPTIONS} />
                </div>
            </div>
        )
    }
}

export default App;