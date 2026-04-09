
import "../../styles/tienda/BtnAddCart.css";

export default function BtnAddCart({ isThereStock, addToCart, upToCart  }) {
    
    const handleAddToCart = () => {

        const addCart = {
            ...addToCart,
            config: {
            
                selectProduct: true,
            }
            
        } 


        upToCart(addCart);
    }

    return (

        <>     
            {
                (isThereStock) ? (

                    <button className="btn-add-cart" onClick={ handleAddToCart }>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                            Agregar
                        </span>
                    </button>

                ) : (
                    
                    <button className="btn-add-cart disabled" disabled>
                        <span>Sin Stock</span>
                    </button>
                )
            }

        </>
    )
}