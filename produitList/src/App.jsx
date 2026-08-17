import produits from "./carte.jsx";
import style from "./index.module.css";
import { useState } from "react";




//function de la portaille







//function de la racine de l'App
 
function APP() {
  // 1. State du panier
  const [panier, setPanier] = useState([]);

  // 2. Fonction pour ajouter au panier
  const ajouterAuPanier = (produit) => {
    const dejaPanier = panier.find((p) => p.id === produit.id);
    if (dejaPanier) {
      augmente(produit.id);
    } else {
      // Correction : On copie tout le produit et on initialise sa quantité à 1
      setPanier([...panier, { ...produit, quantite: 1 }]);
    }  
  };

  function augmente(id) {
    setPanier(
      panier.map((p) => (p.id === id ? { ...p, quantite: p.quantite + 1 } : p))
    );
  }

  function diminuer(id) {
    setPanier(
      panier
        // Correction : On réduit la quantité de 1 (au lieu de l'augmenter)
        .map((p) => (p.id === id ? { ...p, quantite: p.quantite - 1 } : p))
        .filter((p) => p.quantite > 0)
    );
  }

  // 3. Fonction pour vider le panier
  const viderPanier = () => {
    setPanier([]);
  };

  // 4. Calcul du prix total (quantité * prix)
  const totalPrix = panier.reduce((som, p) => som + p.price * p.quantite, 0);

  // 5. Nombres d'articles
  const nombreArticles = panier.reduce((som, p) => som + p.quantite, 0);

  return (
    <>
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
                    className="  p-1.5 text-amber-900 rounded-full hover:bg-amber-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
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
             <div className="flex items-center justify-between mb-4 ">
 <h2 className="text-2xl font-bold text-red-800 mb-4 ">
                Votre panier ({nombreArticles})
              </h2>
              <button 
                    onClick={viderPanier}
                    className="pt-2 pb-6 py-2 rounded-xl hover:transition-colors hover:scale-105 duration-300 cursor-pointer"  >
                    
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>


                  </button>

             </div>

              {panier.length === 0 ? ( 
                   <p className="text-gray-500 text-center py-4">Votre panier est vide</p>
                   ) : (
                <>
                  <div className="flex flex-col gap-4">
                    {panier.map((produit) => (
                      <div key={produit.id} className="flex items-center justify-between gap-3 border-b pb-2 hover:scale-105 transition-transform duration-300">
                        <span className="font-medium text-gray-700 hover:scale-105 transition-transform duration-300">{produit.name}</span>
                        <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                          <button 
                            onClick={() => diminuer(produit.id)}
                            className="px-2 py-1   text- hover:scale-105 transition-transform duration-300"
                          >
                            -
                          </button>
                          <span>{produit.quantite}</span>
                          <button 
                            onClick={() => augmente(produit.id)}
                            className="px-2 py-1 rounded hover:scale-105 transition-transform duration-300 "
                          >
                            +
                          </button>
                        </div>
                        <span className="font-semibold">
                          {(produit.price * produit.quantite).toFixed(2)} $
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-2 border-t flex justify-between font-bold text-lg hover:scale-105 ">
                    <span>Total :</span>
                    <span>{totalPrix.toFixed(2)} $</span>
                  </div>
                <button className="ml-25 p-1.5 text-amber-600 border-2 rounded-2xl ">
                  confirme
                </button>
              
                </>
              )}
            </div>
          </div> 
        </div>
      </div>
    </>
  );  
}

export default APP;