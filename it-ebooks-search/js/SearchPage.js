import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import EbookList from './EbookList';

@inject('bookStore')
@observer
class SearchPage extends Component {

    renderSearchIpt(query) {
        return (
            <div className="search-ipt">
                <input value={query}
                    onChange={this.onChange}
                    onKeyDown={this.searchHandler}
                    placeholder="Input the book's title to search"/>
            </div>
        );
    }

    renderPageView(page, total) {
        total = parseInt(total);
        return total > 0 ? (
            <div className="page-view">
                <span className="to-page" onClick={this.prevPage}>&lt;&nbsp;Prev</span>
                <span className="page-index">{page}/{Math.ceil(total/10)}</span>
                <span className="to-page" onClick={this.nextPage}>Next&nbsp;&gt;</span>
            </div>
        ) : null;
    }

    @autobind
    onChange(event) {
        this.props.bookStore.query = event.target.value;
    }

    @autobind
    searchHandler(event) {
        if (event.keyCode === 13) {
            let query = event.target.value;
            this.props.bookStore.query = query;
            this.props.bookStore.fetchBooks(query, 1);
        }
    }

    @autobind
    prevPage() {
        let { page } = this.props.bookStore;
        if (page > 1) {
            this.toPage(--page);
        }
    }

    @autobind
    nextPage() {
        let { page, total } = this.props.bookStore;
        if (page < Math.ceil(total/10)) {
            this.toPage(++page);
        }
    }

    toPage(page) {
        this.props.bookStore.page = page;
        this.props.bookStore.fetchBooks(this.props.bookStore.query, page);
    }

    render() {
        let {
            query = '',
            page = 1,
            total = 0,
            records = [],
            isLoading = false
        } = this.props.bookStore;
        return (
            <div className="search-page">
                { this.renderSearchIpt(query) }
                { isLoading && loadingView }
                { total > 0 && <EbookList records={records}/> }
                { this.renderPageView(page, total) }
            </div>
        );
    }
}

const emptyView = (
    <div className="empty-view">Input the book's title</div>
);

const noResultsView = (
    <div className="empty-view">No results!</div>
);

const loadingView = (
    <div className="empty-view">Loading...</div>
);

export default SearchPage;
