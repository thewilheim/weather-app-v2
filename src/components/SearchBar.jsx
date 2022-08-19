import React from 'react'

function SearchBar(props) {
    const {searchQuery, setSearchQuery, updateData} = props
  return (
      <form className="searchArea">
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          placeholder="E.g. Sydney"
        />
        <div>
          <button
            className="searchBtn"
            onClick={(e) => updateData(e)}
            type="submit"
          >
            Search
          </button>
          <button className="btnType">C/F</button>
        </div>
      </form>
  )
}

export default SearchBar