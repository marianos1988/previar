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
            <div className="row-search">
                <BtnSearch 
                    searchTerm={searchTerm}
                    onSearch={onSearch}
                    onClear={onClear}
                />
            </div>
            <div className="row-controls">
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
            <div className="row-pagination">
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
    );
}
