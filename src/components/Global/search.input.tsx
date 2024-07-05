"use client";
import styles from "./search-input.module.css";
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import fuzzy from "fuzzy";

interface SearchInputProps {
  results: Array<string>;
}
const DEBOUNCE = 600;

const useSearchAutoComplete = (query: string, results: string[]) => {
  const [matchedResults, setMatchedResults] = useState<Array<string>>([]);
  const searchTimeout = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    if (query.trim().length > 0) {
      searchTimeout.current = setTimeout(() => {
        var matched = fuzzy.filter(query, results).map((el) => el.string);
        setMatchedResults(matched);
      }, DEBOUNCE);
    } else {
    }
  }, [query, results]);

  return matchedResults;
};

export default function SearchInput({ results }: SearchInputProps) {
  const [query, setQuery] = useState<string>("");
  const autoResults = useSearchAutoComplete(query, results);
  return (
    <div className={styles.container}>
      <div className={styles.searchBtn} onClick={console.log}>
        <FaSearch />
      </div>
      <input
        className={styles.searchInput}
        placeholder="Search for Pokemon"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
