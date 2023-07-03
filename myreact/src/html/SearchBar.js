import React, { useState } from "react";
import styles from '../css/post.module.css';

function SearchBar({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.searchdiv}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.search}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="동화제목을 입력해주세요"
          autoComplete="off"
          required
        />
        <button type="submit" className={styles.searchicon}></button>
      </form>
    </div>
  );
}

export default SearchBar;