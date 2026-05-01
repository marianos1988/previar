import BtnSearch from "./BtnSearch.jsx";
import Dropdown from "./Dropdown.jsx";
import BtnCart from "./BtnCart.jsx";
import "../../styles/tienda/controls.css";

export default function Controls({ 
    searchTerm,
    onSearch,
    onClear,
    options,
    selectOrder,
    limitLabel,
    limitOptions,
    selectLimit,
    numBadge,
    handleViewCart,
    currentPage,
    viewProducts,
    productsLimit,
    handlePageChange
}) {
    return (
        <div className="box-dropdown">
            {/* Desktop: 2 rows (min-width 768px) */}
            <div className="row-desktop-controls">
                {/* First row: Search + Dropdowns + Cart */}
                <div className="desktop-row-1">
                    <BtnSearch 
                        searchTerm={searchTerm}
                        onSearch={onSearch}
                        onClear={onClear}
                    />
                    <Dropdown 
                        label="Ordenar por:" options={options} onSelect={ selectOrder }
                        moodInfo={false}                            
                    />
                    <Dropdown
                        label={limitLabel} options={limitOptions} onSelect={ selectLimit }
                        moodInfo={false}
                    />
                    <BtnCart 
                        ordersList = {numBadge}
                        handleViewCart = {() => handleViewCart()}
                    />
                </div>
                
                {/* Second row: Pagination */}
                <div className="desktop-row-2">
                    <div className="pagination-controls">
                        <button 
                            className="page-btn" 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        <span className="page-info">
                            {currentPage} / {Math.max(1, Math.ceil(viewProducts.length / productsLimit))}
                        </span>
                        <button 
                            className="page-btn"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= Math.ceil(viewProducts.length / productsLimit)}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile: 3 rows (max-width 768px) */}
            <div className="row-mobile-controls">
                {/* First row: Search */}
                <div className="mobile-row-1">
                    <BtnSearch 
                        searchTerm={searchTerm}
                        onSearch={onSearch}
                        onClear={onClear}
                    />
                </div>
                
                {/* Second row: Dropdowns + Cart */}
                <div className="mobile-row-2">
                    <Dropdown 
                        label="Ordenar por:" options={options} onSelect={ selectOrder }
                        moodInfo={false}                            
                    />
                    <Dropdown
                        label={limitLabel} options={limitOptions} onSelect={ selectLimit }
                        moodInfo={false}
                    />
                    <BtnCart 
                        ordersList = {numBadge}
                        handleViewCart = {() => handleViewCart()}
                    />
                </div>
                
                {/* Third row: Pagination */}
                <div className="mobile-row-3">
                    <div className="pagination-controls">
                        <button 
                            className="page-btn" 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        <span className="page-info">
                            {currentPage} / {Math.max(1, Math.ceil(viewProducts.length / productsLimit))}
                        </span>
                        <button 
                            className="page-btn"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= Math.ceil(viewProducts.length / productsLimit)}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
