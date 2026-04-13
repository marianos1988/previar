import { useState } from 'react';
import '../../styles/tienda/BtnSearch.css';

export default function BtnSearch({ onSearch, onClear }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) onSearch(value);
    };

    const handleClear = () => {
        setSearchTerm("");
        if (onClear) onClear();
    };

    return (
        <div className="search-wrapper active">
            <span className="search-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </span>
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleInputChange}
                className="search-input"
            />
            {searchTerm && (
                <button className="search-clear" onClick={handleClear}>✕</button>
            )}
        </div>
    );
}