import React, {PureComponent} from 'react';
import Footer from  '../../component/Footer'
import { Link } from "react-router-dom";

export default class NotFound extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <main className="body-404">
                    <div className="centerized msg-404">
                        <h1>404. The Page you looking for is not found. </h1>
                        <Link to="/">Go Home</Link> 
                    </div>
                    </main>
                <Footer />
            </React.Fragment>
        );
    }
}