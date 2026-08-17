import produits from "./carte.jsx";
import style from "./index.module.css";
import { useState } from "react";

// Composant principal de l'application

function APP() {
  const [panier, setPanier] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Ajouter un produit au panier
  const ajouterAuPanier = (produit) => {
    setPanier((prev) => {
      const dejaPanier = prev.find((p) => p.id === produit.id);
      if (dejaPanier) {
        return prev.map((p) =>
          p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
        );
      }
      return [...prev, { ...produit, quantite: 1 }];
    });
  };

  // Augmenter la quantité
  const augmente = (id) => {
    setPanier((prevPanier) =>
      prevPanier.map((p) =>
        p.id === id ? { ...p, quantite: p.quantite + 1 } : p
      )
    );
  };

  // Diminuer la quantité
  const diminuer = (id) => {
    setPanier((prevPanier) =>
      prevPanier
        .map((p) => (p.id === id ? { ...p, quantite: p.quantite - 1 } : p))
        .filter((p) => p.quantite > 0)
    );
  };

  const viderPanier = () => setPanier([]);

  // Calculs
  const totalPrix = panier.reduce((som, p) => som + p.price * p.quantite, 0);
  const nombreArticles = panier.reduce((som, p) => som + p.quantite, 0);

  // Confirmation
  const ouvrirConfirmation = () => setShowConfirmation(true);
  const fermerConfirmation = () => setShowConfirmation(false);

  const confirmerCommande = () => {
    console.log("Commande confirmée ! Total :", totalPrix.toFixed(2), "$");
    setShowConfirmation(false);
    setPanier([]);
  };

  return (
    <>
      <div className="p-4 flex flex-col md:flex-row justify-between items-start gap-8 max-w-7xl mx-auto">
        
        {/* SECTION PRODUITS */}
        <div className={style.panier}>
          <h1 className="font-pencerio text-4xl sm:text-6xl md:text-8xl pl-2 md:pl-7 pt-4 md:pt-7 font-bold hover:scale-105 transition-transform duration-300 antialiased">
            Sweet Treats
          </h1>

          <h2 className="font-pencerio text-xl sm:text-2xl md:text-4xl pl-2 md:pl-7 pt-2 font-bold hover:scale-105 transition-transform duration-300 antialiased">
            Delicate Dessert-curated collection
          </h2>

          <div className={style.produit}>
            {produits.map((produit) => (
              <div
                key={produit.id}
                className={`${style.carte} hover:scale-105 transition-all duration-300 ease-in-out rounded-2xl antialiased bg-white/20`}
              >
                <img
                  src={produit.image}
                  alt={produit.name}
                  className={`${style.img} rounded-2xl hover:rotate-1`}
                />

                <h3 className="pl-2.5 hover:scale-105 transition-transform duration-300 font-semibold mt-2 text-sm sm:text-base">
                  {produit.name}
                </h3>

                <div className={`${style.etoile} flex items-center justify-start pl-2.5 hover:scale-105 transition-transform duration-300 my-1`}>
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="size-4 text-amber-500"
                    >
                      <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  ))}
                </div>

                <div className={`${style.div} flex items-center justify-between p-2.5`}>
                  <div className="text-orange-500 text-base sm:text-lg font-bold hover:scale-105 transition-transform duration-300">
                    ${produit.price.toFixed(2)}
                  </div>

                  <button
                    onClick={() => ajouterAuPanier(produit)}
                    className="p-1.5 text-amber-900 rounded-full hover:bg-amber-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
                    title="Ajouter au panier"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1-1.5 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION PANIER */}
        <div className={style.panier}>
          <div className={style.pani}>
            <div className="w-full md:w-80 bg-white p-6 rounded-2xl shadow-md h-fit hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-red-800">
                  Votre panier ({nombreArticles})
                </h2>
                <button
                  onClick={viderPanier}
                  className="p-1 rounded-xl hover:scale-105 duration-300 cursor-pointer text-gray-500 hover:text-red-600"
                  title="Vider le panier"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {panier.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Votre panier est vide
                </p>
              ) : (
                <>
                  <div className="flex flex-col gap-4 max-h-60 overflow-y-auto pr-1">
                    {panier.map((produit) => (
                      <div
                        key={produit.id}
                        className="flex items-center justify-between gap-3 border-b pb-2 hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
                      >
                        <span className="font-medium text-gray-700">
                          {produit.name}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => diminuer(produit.id)}
                            className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span>{produit.quantite}</span>
                          <button
                            onClick={() => augmente(produit.id)}
                            className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded"
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

                  <div className="mt-4 pt-2 border-t flex justify-between font-bold text-lg">
                    <span>Total :</span>
                    <span>{totalPrix.toFixed(2)} $</span>
                  </div>

                  <button
                    onClick={ouvrirConfirmation}
                    className="mt-5 w-full p-2 text-amber-600 border-2 border-amber-600 rounded-2xl hover:bg-amber-600 hover:text-white transition-all duration-300 cursor-pointer font-semibold"
                  >
                    Confirmer
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE CONFIRMATION */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center">
            <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-amber-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-amber-600"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-red-800 mb-3">
              Confirmation
            </h2>

            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Voulez-vous vraiment confirmer votre commande ?
            </p>

            <div className="bg-amber-50 rounded-xl p-3 mb-6">
              <p className="text-gray-600 text-sm">Total de la commande</p>
              <p className="text-2xl font-bold text-amber-600">
                {totalPrix.toFixed(2)} $
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={fermerConfirmation}
                className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={confirmerCommande}
                className="px-5 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700 transition-colors cursor-pointer"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default APP;