import "../../styles/tienda/TiendaGeneral.css";
import Dropdown from "./Dropdown";
import Filters from "./Filters";

import { useEffect, useState } from "react";
import { Card } from "./Card";
import { CardInfo } from "./CardInfo";
import BtnCart from "./BtnCart";
import BtnSearch from "./BtnSearch";
import ProductCart from "./ProductCart";
import BtnOrder from "./BtnOrder";




export default function MerchGeneral( { categories, products }) {

const stateOpenGrid = false;
const stateViewCart = false;
const stateProducts = [];

products.map( (product) => {

let configProduct = {
    ...product,
    config: {
        addTilde: false
    }
}

stateProducts.push(configProduct)

})



const stateNameCategory = "Productos";
const [ openGrid, setOpenGrid ] = useState(stateOpenGrid);
const [viewProducts, setViewProducts ] = useState(stateProducts);
const [ nameCategory, setNameCategory ] = useState(stateNameCategory);
const [viewCart, setViewCart] = useState(stateViewCart)
const [ productsLimit, setProductsLimit ] = useState(10);
const [ limitLabel, setLimitLabel ] = useState("Mostrar: 10");
const [ searchTerm, setSearchTerm ] = useState("");


const initialStateChangeScreenProducts = {
    optionScreen: 1,
    id: undefined
}

const [ changeScreenProducts, setChangeScreenProducts ] = useState(initialStateChangeScreenProducts)


// Cambia la pantalla de lista de productospor info de productos y biseversa
const handleChangeScreenProducts = (option) => {

    switch(option.optionScreen) {

        case 1: setChangeScreenProducts(initialStateChangeScreenProducts);
            break;
        
        case 2: setChangeScreenProducts({
            optionScreen: option.optionScreen,
            id: option.id
        });
            break;


    }

    
}



const stateOrdersList = []

 const [ ordersList, setOrderList ] = useState(stateOrdersList);
const [numBadge, setNumBadge] = useState(0);



//Manejar agregar producto al carrito
 const handleSetOrderList = (newOrder) => {


    //Agregar producto carrito de compras
    setOrderList(prev => { 
        const exists = prev.some(p => p.id === newOrder.id);

        // no agrega duplicado
        if (exists) return prev;     

        //Agrega funciona extras si no se duplica
        else if(!exists) {

            //Aumenta el nummero de badge
            setNumBadge(ordersList.length + 1)

        }

    
        return [...prev,
                    {
                    ...newOrder,
                    quantity: 1,
                    subtotal: newOrder.price

                }];
    });
        

        //Agregar tilde en producto
        setViewProducts(prevProducts =>
            prevProducts.map(product =>
            product.id === newOrder.id
                ? { 
                    ...product,
                    config: { addTilde: true } 
                }
                : product
        ))



}



//Borrar producto del carrito
  const handleDeleteToCart = (orderDelete) => {
        let newList = []
        ordersList.map(
            (order) => {
                if(order.id !== orderDelete) {
                    newList.push(order)

                }
            }
        )

        setOrderList(newList)

         // Quitar tilde agregar carrito
        setViewProducts(prevProducts =>
            prevProducts.map(product =>
            product.id === orderDelete
                ? { 
                    ...product,
                    config: { addTilde: false } 
                }
                : product
        ))

            //Disminuye el numero de badge
            setNumBadge(ordersList.length - 1)

    }



 //Abrir y cerrar filtros
 const handleOpenGrid = ( data ) => {
    setOpenGrid(data)

 }

 //Abrir y cerrar Carrito de compras
 const handleViewCart = () => {
    setViewCart(!viewCart)
 }



  const options = [
    { label: "Mayor precio", value: 1 },
    { label: "Menor precio", value: 2 },
    { label: "Ordenar A - Z", value: 3 },
    { label: "Ordenar Z - A", value: 4 }

  ];

  const limitOptions = [
    { label: "10 productos", value: 10 },
    { label: "25 productos", value: 25 },
    { label: "50 productos", value: 50 },
    { label: "100 productos", value: 100 }
  ];

  const selectLimit = (option) => {
    setProductsLimit(option.value);
    setLimitLabel(`Mostrar: ${option.value}`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setViewProducts(stateProducts);
      setNameCategory("Productos");
    } else {
      const filtered = stateProducts.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setViewProducts(filtered);
      setNameCategory(`Resultados: "${term}"`);
    }
  }

  const clearSearch = () => {
    setSearchTerm("");
    setViewProducts(stateProducts);
    setNameCategory("Productos");
  }

  const selectOrder = (option) => {
    
    switch(option.value) {

        case 1: {

                    const sortedProducts = [...viewProducts].sort((a, b) => b.price - a.price)
                    setViewProducts(sortedProducts);
                    break;
        } 
        case 2: {


                    const sortedProducts = [...viewProducts].sort((a, b) => a.price - b.price)
                    setViewProducts(sortedProducts);
                    break;

        } 
        case 3: {

                    const sortedProducts = [...viewProducts].sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    setViewProducts(sortedProducts)
                    break;
        } 
        case 4: {

                    const sortedProducts = [...viewProducts].sort((a, b) =>
                        b.name.localeCompare(a.name)
                    );
                    setViewProducts(sortedProducts)
                    break;
        } 
    }


  };

  const selectCategory = ( categories ) => {

        if(!categories || categories.length === 0) {
            setViewProducts(stateProducts);
            setNameCategory(stateNameCategory);
        } else {
            let newViewProducts = [];

            stateProducts.forEach(
                (product) => {
                    if(categories.includes(product.category)) {
                        newViewProducts.push(product)
                    }
                }
            )
            setViewProducts(newViewProducts);
            setNameCategory(categories.length > 1 ? `${categories.length} categorías` : categories[0]);

        }
  }


  //MAnejar precio sumando unidades
  const handleIncreaseQuantity = ({id, quantity}) => {


    setOrderList(prevCart =>
        prevCart.map(product =>
        product.id === id
            ? {
                ...product,
                quantity: quantity,
                subtotal: product.price * quantity
            }
            : product
        )
    );



    };

//MAnejar precio restando unidades
  const handleDecreaseQuantity = ({ id, quantity }) => {


    setOrderList(prevCart =>
        prevCart.map(product =>
        product.id === id & product.quantity > 1
            ? {
                ...product,
                quantity: quantity,
                subtotal: product.price * quantity
            }
            : product
        )
    );

  }



  //MAnejar precio cambio de stock en input
  const handleChangeQuantity = ({id, quantity}) => {


    setOrderList(prevCart =>
        prevCart.map(product =>
        product.id === id
            ? {
                ...product,
                quantity: quantity,
                subtotal: product.price * quantity
            }
            : product
        )
    );


  }

  //Funcion sumar total del carrito
        const totalR = ordersList.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
    );



  useEffect(() => {

  },[])

    return(
        <div className={(openGrid) ? `container-merch active` : `container-merch`}>
            <section className="sec-tittles">

                <h3> {`Categoría / ${nameCategory}`} </h3>
            </section>
            
            <section className="sec-filters">
                <Filters
                    categories = {categories}
                    handleOpenGrid = { handleOpenGrid }
                    openGrid={ openGrid }
                    handleSelectCategory={ (c)=> selectCategory(c) }
                    screenOption={ handleChangeScreenProducts }
                />
            </section>
            
            
            {
                /*Cambiar pantalla de lista de productos por info del producto*/
                (changeScreenProducts.optionScreen === 1) && (
                    
                    <section className="sec-products">
                        <div className="box-dropdown">
                            <BtnSearch 
                                searchTerm={searchTerm}
                                onSearch={handleSearch}
                                onClear={clearSearch}
                            />
                            <div className="row-controls">
                                <Dropdown
                                    label="Ordenar por:" options={options} onSelect={ selectOrder }
                                    moodInfo={false}                            />
                                <Dropdown
                                    label={limitLabel} options={limitOptions} onSelect={ selectLimit }
                                    moodInfo={false}
                                />
                                <BtnCart 
                                    ordersList = {numBadge}
                                    handleViewCart = {() => handleViewCart()}
                                />
                            </div>
                        </div>
                        <div className="list-products" key={viewProducts.map(p => p.id).join("-")}>

                            {
                                viewProducts.slice(0, productsLimit).map(
                                    (product) => (
                                        <Card 
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            description={product.description}
                                            isThereStock={true} 
                                            upToCart2={ handleSetOrderList }
                                            tilde={product.config.addTilde}
                                            screenOption={handleChangeScreenProducts}
                                        />
                                    )
                                )
                            }
                        </div>
                    </section> 
                )
            }

            {
                /*Cambiar pantalla de info productos por lista del productos*/
                (changeScreenProducts.optionScreen === 2) && (
                    
                    <section className="sec-info-product">

                        <div className="box-dropdown">
                            <BtnSearch 
                                searchTerm={searchTerm}
                                onSearch={handleSearch}
                                onClear={clearSearch}
                            />
                            <div className="row-controls">
                                <Dropdown 
                                    label="Ordenar por:" options={options} onSelect={ selectOrder }
                                    moodInfo={true}
                                />
                                <BtnCart 
                                    ordersList = {numBadge}
                                    handleViewCart = {() => handleViewCart()}
                                />
                            </div>
                        </div>
                        <div className="info-product">

                            {
                                viewProducts.map(
                                    (product) => (
                                        (product.id === changeScreenProducts.id) && (
                                        <CardInfo 
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            description={product.description}
                                            isThereStock={true} 
                                            upToCart2={ handleSetOrderList }
                                            tilde={product.config.addTilde}
                                            screenOption={handleChangeScreenProducts}

                                        />  
                                    )

                                    )
                                )
                            }
                        </div>
                    </section> 
                )
            }


            <section className={(viewCart) ? `sec-cart active` : `sec-cart`}>
                <div className="box-close">
                    <button onClick={()=>handleViewCart()} className="btn-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="box-tittles">
                    <h3>Producto</h3>
                    <h3 className="subtotal">Subtotal</h3>
                </div>

                <div className="list-cart">
                    {
                        ordersList.map(
                            (order, index) => (
                                <ProductCart
                                    key={index}
                                    id={order.id}
                                    name={order.name}
                                    price={order.price}
                                    image={order.id}
                                    subtotal={order.subtotal}
                                    quantity={order.quantity}
                                    deleteProduct= { handleDeleteToCart }
                                    increaseQuantity= { handleIncreaseQuantity }
                                    decreaseQuantity= { handleDecreaseQuantity }
                                    changeQuantity={ handleChangeQuantity }

                                />
                            )
                        )
                    }
                </div>

                <div className="box-total"> 
                    <h3>Total</h3>
                    <h3 className="total">{`$${totalR}`}</h3>
                </div>
                <div className="box-order">
                    <BtnOrder 
                        isThereStock={(ordersList.length > 0) ? true : false}
                        listOrder={ordersList}
                        total={totalR}

                    />
                </div>
            </section>
        </div>
    )  
}