import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import * as compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

const AddBook = ({ getAuthorsQuery: { loading, authors }, addBookMutation }) => {
  const [value, setValue] = useState('')
  const onChange = fieldName => ({target}) => setValue(state => ({...state,[fieldName]:target.value}))

  return (
    <form id="add-book" 
      onSubmit={(e) => {
        e.preventDefault()
        const { book, author, genre } = value;
        addBookMutation({
          variables: {
            name: book,
            genre,
            authorId: author
          },
          refetchQueries: [{query: getBooksQuery}]
        })
      }}
    >
      <div className="field">
        <label htmlFor="Book Name">Book name:</label>
        <input name="book" onChange={onChange('book')} value={value.book || ''} type="text"/>
      </div>
      <div className="field">
        <label htmlFor="Genre">Genre:</label>
        <input name="genre" onChange={onChange('genre')} value={value.genre || ''} type="text"/>
      </div>
      <div className="field">
        <label htmlFor="Author">Author:</label>
        <select name="author" onChange={onChange('author')} value={value.author}>
          <option>Select author</option>
          {!loading ? authors.map(({ name, id }) => <option value={id} key={id}>{name}</option>) :  <option>Loading authors</option> }
        </select>
      </div>
      <button>+</button>
    </form>
  )
}
 

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
  graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook)
