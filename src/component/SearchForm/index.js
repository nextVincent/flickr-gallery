import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const TYPE_TIMEOUT = 1000;

export default class SearchForm extends PureComponent {
    state = {
        key: "",
        spin: false
    }
    
    componentWillMount() {
        this.timer = null;
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    static defaultProps = {
        submit: () => {}
    };

    static propTypes = {
        submit: PropTypes.func.isRequired
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({spin: true})
        this.props.submit(this.state.key, () => {
            this.setState({spin: false});
        });
    }

    handleChange = (e) => {
        e.preventDefault();
        clearTimeout(this.timer);
        this.setState({key: e.target.value, spin: true},
        () => {
            this.timer = setTimeout(() => {
                this.props.submit(this.state.key, () => {
                    this.setState({spin: false});
                });
            }, TYPE_TIMEOUT)
        });
    }

    render() {
        const { key, spin } = this.state;
        return (
            <div className="search-form">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="search"><button onClick={this.handleSubmit}><i className={'fa ' + (spin ? 'fa-spinner fa-pulse fa-fw' : 'fa-search')} aria-hidden="true"></i></button></label>
                    <input id="search" placeholder="Search by keywords" value={key} onChange={this.handleChange}></input>
                </form>
            </div>
        )
    }
}