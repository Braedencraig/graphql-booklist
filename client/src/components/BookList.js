import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

const BookList = ({ data: { books, loading }}) => {

  const [bookId, setId] = useState('')

  if(loading) {
    return(
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <ul id="book-list">
        {books.map(({ name, id }) => <li onClick={() => setId(id)} key={id}>{name}</li> )}
      </ul>
      <BookDetails queryId={bookId} />
    </div>
  )
}

export default graphql(getBooksQuery)(BookList)
