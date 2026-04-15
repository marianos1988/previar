import { useState, useRef } from "react";
import "../../styles/tienda/Filters.css"

export default function Filters({ categories, handleOpenGrid, openGrid, handleSelectCategory, screenOption }) {

    const listCategories = [...categories].sort();
    
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isAtTop, setIsAtTop] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const menuRef = useRef(null);
    
    const checkCantCategories = (number) => { 

        if(number >= 8) return "eight-more";
        else if(number == 7) return "seven";
        else if(number == 6) return "six";
        else if(number == 5) return "five";
        else if(number == 4) return "four";
        else if(number == 3) return "three";
        else if(number == 2) return "two";
        else if(number == 1) return "one";
        return "four";
    }

    const numberCategories = checkCantCategories(listCategories.length);
    
    const toggleSidebar = () => {
        handleOpenGrid(!openGrid);
    };

    const handleCategoryToggle = (category) => {
        let newSelected;
        
        if (selectedCategories.includes(category)) {
            newSelected = selectedCategories.filter(c => c !== category);
        } else {
            newSelected = [...selectedCategories, category];
        }
        
        setSelectedCategories(newSelected);
        handleSelectCategory(newSelected);
    };

    const handleShowAll = () => {
        setSelectedCategories([]);
        handleSelectCategory([]);
    };

    const handleScroll = () => {
        if (menuRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = menuRef.current;
            setIsAtTop(scrollTop === 0);
            setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
        }
    };

    const scrollUp = () => {
        if (menuRef.current && !isAtTop) {
            menuRef.current.scrollBy({ top: -150, behavior: 'smooth' });
        }
    };

    const scrollDown = () => {
        if (menuRef.current && !isAtBottom) {
            menuRef.current.scrollBy({ top: 150, behavior: 'smooth' });
        }
    };

    return(    
        <>  
            <div className={`container-filters ${numberCategories}-categories ${openGrid ? 'open' : ''}`}>
                <nav className="sidebar">
                    <div className="sidebar-inner">

                        <div className="sidebar-header">
                            <button type="button" className="sidebar-burger" onClick={toggleSidebar}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 6h16"/>
                                    <path d="M4 12h16"/>
                                    <path d="M4 18h16"/>
                                </svg>
                            </button>
                            <h3>Categorías</h3>
                        </div>

                        <div className="scroll-arrow-top">
                            <button 
                                className={`arrow-btn arrow-up ${isAtTop ? 'disabled' : ''}`} 
                                onClick={scrollUp}
                                disabled={isAtTop}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 15l-6-6-6 6"/>
                                </svg>
                            </button>
                        </div>

                        <nav className="sidebar-menu" ref={menuRef} onScroll={handleScroll}>

                            <label className="category-item">
                                <input 
                                    type="checkbox" 
                                    checked={selectedCategories.length === 0}
                                    onChange={handleShowAll}
                                />
                                <span className="checkmark"></span>
                                <span className="category-label">Todos</span>
                            </label>

                            {listCategories.map((category, index) => (
                                <label key={index} className="category-item">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryToggle(category)}
                                    />
                                    <span className="checkmark"></span>
                                    <span className="category-label">{category}</span>
                                </label>
                            ))}

                        </nav>

                        <div className="scroll-arrow-bottom">
                            <button 
                                className={`arrow-btn arrow-down ${isAtBottom ? 'disabled' : ''}`} 
                                onClick={scrollDown}
                                disabled={isAtBottom}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}