import React, { useState } from "react";
import produits from "./carte.jsx";
import style from "./index.module.css";

function APP() {
  // 1. State du panier
  const [panier, setPanier] = useState([]);

  // 2. Fonction pour ajouter au panier
  const ajouterAuPanier = (produit) => {
    setPanier([...panier, produit]);
  };

  // 3. Fonction pour vider le panier
  const viderPanier = () => {
    setPanier([]);
  };

  // 4. Calcul du total
  const total = panier.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-4 flex flex-col md:flex-row gap-8">
      {/* ===== SECTION PRODUITS ===== */}
      <div className={`${style.panier}`}>
        <h1 className="font-pencerio text-8xl pl-7 pt-7 font-bold hover:scale-105 transition-transform duration-300 antialiased">
          Sweet Treats
        </h1> 
        <h1 className="font-pencerio text-4xl pl-7 pt-2 font-bold hover:scale-105 transition-transform duration-300 antialiased">
          Delicate Dessert-curated collection
        </h1>

        <div className={`${style.produit}`}> 
          {produits.map((produit) => (
            <div 
              key={produit.id} 
              className={`${style.carte} hover:scale-105 transition-all duration-300 ease-in-out rounded-2xl antialiased`}
            >
              <img 
                src={produit.image} 
                alt={produit.name} 
                className={`${style.img} rounded-2xl hover:rotate-1`} 
              />
              <h3 className="pl-2.5 hover:scale-105 transition-transform duration-300 font-semibold mt-2">
                {produit.name}
              </h3>

              {/* Étoiles */}
              <div className={`${style.etoile} flex items-center justify-start pl-2.5 hover:scale-105 transition-transform duration-300 my-1`}>
                {[...Array(4)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-amber-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                ))}
              </div> 

              {/* Prix et Bouton */}
              <div className={`${style.div} flex items-center justify-between p-2.5`}>
                <div className="text-orange-500 text-lg font-bold hover:scale-105 transition-transform duration-300">
                  ${produit.price.toFixed(2)}
                </div>
                
                <button 
                  onClick={() => ajouterAuPanier(produit)}
                  className="text-amber-900 p-1.5 rounded-full hover:bg-amber-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
                  title="Ajouter au panier"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div> 
      </div>

      {/* ===== SECTION PANIER ===== */}
     <div className={`${style.panier}`}>
      <div className={`${style.pani}`}>
    
<div className="w-full md:w-80 bg-white p-6 rounded-2xl shadow-md h-fit mt-10 hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl font-bold text-red-800 mb-4 ">
          Your Cart ({panier.length})
        </h2>

        {panier.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Votre panier est vide</p>
        ) : (
          <div className="flex flex-col gap-3">
            {panier.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="font-bold text-orange-500">${item.price.toFixed(2)}</span>
              </div>
            ))}

            <div className="flex justify-between items-center pt-3 font-bold text-lg border-t mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button 
              onClick={viderPanier}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl transition-colors duration-200"
            >
              Vider le panier
            </button>
          </div>
        )}
      </div>
      </div> 
      </div>
      </div>
  );  
}

export default APP;