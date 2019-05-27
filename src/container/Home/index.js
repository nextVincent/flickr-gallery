import React, {Component} from 'react';

import Header from '../../component/Header';
import Footer from '../../component/Footer';
import Gallery from '../../component/Gallery';

const THREDHOLD = 10;

export default class Home extends Component {
    state = {
        items: [],
        sourceItem: [], //contain all items for reference
        pages: 1,
        loading: true,
    }

    componentDidMount() {
        fetch("/services/feeds/photos_public.gne?format=json&nojsoncallback=1")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState((prev, props) => {
                return {
                    items: data.items,
                    sourceItem: data.items,
                    loading: false
                }
            })
        })
        .catch(e => console.error(e));

    }

    pageNext = () => {
        this.setState(( prev, props ) => {
            return {pages: prev.pages + 1}
        });
    }

    onSearch = (key, callback) => {
        let newItems = [];
        if (key && key !== "") {
            newItems = this.state.sourceItem.filter( el => el.title.includes(key) || el.tags.includes(key) || el.author.includes(key));
        } else {
            newItems = this.state.sourceItem;
        }
        this.setState({
            items: newItems,
            pages: 1,
            loading: false
        }, callback);
    }

    render() {
        const {loading, items, pages} = this.state;
        const pageItems = items.slice(0, pages*THREDHOLD);  //if the api allows request by page, this is not needed, this is only to sumulate a load more functionality
        return (
            <React.Fragment>
                <Header submit={this.onSearch}/>
                <main>
                    {
                        loading ? <div className="loading-spin"><i className="fas fa-spinner fa-pulse  fa-fw"></i><span>Loading</span></div> : <Gallery items={pageItems} nextPage={this.pageNext} showNext={items.length > pageItems.length}/>
                    }
                </main>
                <Footer />
            </React.Fragment>
        );
    }
}