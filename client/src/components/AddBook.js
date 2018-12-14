import React from 'react';
import { Query } from 'react-apollo';
import AddBookForm from './AddBookForm';

import { getAuthorsQuery } from '../queries/query';

const AddBook  = () => {
    return (
      <div className="main">
        <Query query={getAuthorsQuery}>
            {
                ({ loading, error, data}) => {
                    return <AddBookForm loading = {loading} data={data}/>
                }
            }
        </Query>
      </div>       
    )
};

export default AddBook;
