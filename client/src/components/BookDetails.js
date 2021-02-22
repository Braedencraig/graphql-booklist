import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

const BookDetails = (props) => {
  const { queryId, data: { book } } = props
  if(book) {
    return(
      <div id="book-details">
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {book.author.books.map(book => <li key={book.id}>{book.name}</li>)}
        </ul>
      </div>
    )
  }
  
  return (
    <div id="book-details">
      <p>No book selected</p>
    </div>
  )
}
  
export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.queryId
      }
    }
  }
})(BookDetails)