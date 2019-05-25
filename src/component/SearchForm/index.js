import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class SearchForm extends PureComponent {
    state = {
        key: ""
    }
    
    static defaultProps = {
        submit: () => {}
    };

    static propTypes = {
        submit: PropTypes.func.isRequired
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.submit(this.state.key);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({key: e.target.value})
    }

    render() {
        const { key } = this.state;
        return (
            <div className="search-form">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="search"><img src="https://image.flaticon.com/icons/svg/54/54481.svg" alt="Search"/></label>
                    <input id="search" placeholder="Search by keywords" value={key} onChange={this.handleChange}></input>
                </form>
            </div>
        )
    }
}