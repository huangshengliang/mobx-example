import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import Ebook from './Ebook';

class EbookList extends Component {
    render() {
        let { records = [] } = this.props;
        return (
            <div className="book-list">{
                records.map((book) => (<Ebook key={book.id} {...book}/>))
            }</div>
        );
    }
}

export default EbookList;
