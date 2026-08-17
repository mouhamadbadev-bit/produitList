import produits from "./carte.jsx";
import style from "./index.module.css";
import { useState } from "react";

// Fonction racine de l'App
function APP() {
  // =========================
  // STATES
  // =========================

  // State du panier
  const [panier, setPanier] = useState([]);

  // State du portail de confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);

  // =========================
  // PANIER
  // =========================

  // Ajouter un produit au panier
  const ajouterAuPanier = (produit) => {
    const dejaPanier = panier.find((p) => p.id === produit.id);

    if (dejaPanier) {
      augmente(produit.id);
    } else {
      setPanier([
        ...panier,
        {
          ...produit,
          quantite: 1,
        },
      ]);
    }
  };

  // Augmenter la quantité
  function augmente(id) {
    setPanier(
      panier.map((p) =>
        p.id === id
          ? { ...p, quantite: p.quantite + 1 }
          : p
      )
    );
  }

  // Diminuer la quantité
  function diminuer(id) {
    setPanier(
      panier
        .map((p) =>
          p.id === id
            ? { ...p, quantite: p.quantite - 1 }
            : p
        )
        .filter((p) => p.quantite > 0)
    );
  }

  // Vider le panier
  const viderPanier = () => {
    setPanier([]);
  };

  // =========================
  // CALCULS
  // =========================

  // Prix total
  const totalPrix = panier.reduce(
    (som, p) => som + p.price * p.quantite,
    0
  );

  // Nombre d'articles
  const nombreArticles = panier.reduce(
    (som, p) => som + p.quantite,
    0
  );

  // =========================
  // CONFIRMATION
  // =========================

  // Ouvrir le portail
  const ouvrirConfirmation = () => {
    setShowConfirmation(true);
  };

  // Fermer le portail
  const fermerConfirmation = () => {
    setShowConfirmation(false);
  };

  // Confirmer la commande
  const confirmerCommande = () => {
    console.log("Commande confirmée !");
    console.log("Total :", totalPrix.toFixed(2), "$");

    // Fermer le portail
    setShowConfirmation(false);

    // Vider le panier
    setPanier([]);

    // Tu peux remplacer ceci par une redirection
    // ou une requête vers ton backend.
  };

  // =========================
  // RETURN
  // =========================

  return (
    <>
      <div className="p-4 flex flex-col md:flex-row gap-8">

        {/* =====================================
            SECTION PRODUITS
        ===================================== */}

        <div className={style.panier}>

          <h1 className="font-pencerio text-8xl pl-7 pt-7 font-bold hover:scale-105 transition-transform duration-300 antialiased">
            Sweet Treats
          </h1>

          <h1 className="font-pencerio text-4xl pl-7 pt-2 font-bold hover:scale-105 transition-transform duration-300 antialiased">
            Delicate Dessert-curated collection
          </h1>

          <div className={style.produit}>

            {produits.map((produit) => (

              <div
                key={produit.id}
                className={`${style.carte} hover:scale-105 transition-all duration-300 ease-in-out rounded-2xl antialiased`}
              >

                {/* IMAGE */}
                <img
                  src={produit.image}
                  alt={produit.name}
                  className={`${style.img} rounded-2xl hover:rotate-1`}
                />

                {/* NOM */}
                <h3 className="pl-2.5 hover:scale-105 transition-transform duration-300 font-semibold mt-2">
                  {produit.name}
                </h3>

                {/* ÉTOILES */}
                <div
                  className={`${style.etoile} flex items-center justify-start pl-2.5 hover:scale-105 transition-transform duration-300 my-1`}
                >

                  {[...Array(4)].map((_, i) => (

                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 text-amber-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>

                  ))}

                </div>

                {/* PRIX + BOUTON PANIER */}
                <div
                  className={`${style.div} flex items-center justify-between p-2.5`}
                >

                  <div className="text-orange-500 text-lg font-bold hover:scale-105 transition-transform duration-300">
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

        {/* =====================================
            SECTION PANIER
        ===================================== */}

        <div className={style.panier}>

          <div className={style.pani}>

            <div className="w-full md:w-80 bg-white p-6 rounded-2xl shadow-md h-fit mt-10 hover:scale-105 transition-transform duration-300">

              {/* TITRE PANIER */}

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-2xl font-bold text-red-800 mb-4">
                  Votre panier ({nombreArticles})
                </h2>

                {/* BOUTON VIDER */}
                <button
                  onClick={viderPanier}
                  className="pt-2 pb-6 py-2 rounded-xl hover:scale-105 duration-300 cursor-pointer"
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>

                </button>

              </div>

              {/* PANIER VIDE */}

              {panier.length === 0 ? (

                <p className="text-gray-500 text-center py-4">
                  Votre panier est vide
                </p>

              ) : (

                <>

                  {/* PRODUITS DU PANIER */}

                  <div className="flex flex-col gap-4">

                    {panier.map((produit) => (

                      <div
                        key={produit.id}
                        className="flex items-center justify-between gap-3 border-b pb-2 hover:scale-105 transition-transform duration-300"
                      >

                        {/* NOM */}
                        <span className="font-medium text-gray-700">
                          {produit.name}
                        </span>

                        {/* QUANTITÉ */}

                        <div className="flex items-center gap-2">

                          <button
                            onClick={() => diminuer(produit.id)}
                            className="px-2 py-1 hover:scale-105 transition-transform duration-300"
                          >
                            -
                          </button>

                          <span>
                            {produit.quantite}
                          </span>

                          <button
                            onClick={() => augmente(produit.id)}
                            className="px-2 py-1 rounded hover:scale-105 transition-transform duration-300"
                          >
                            +
                          </button>

                        </div>

                        {/* PRIX */}

                        <span className="font-semibold">
                          {(produit.price * produit.quantite).toFixed(2)} $
                        </span>

                      </div>

                    ))}

                  </div>

                  {/* TOTAL */}

                  <div className="mt-4 pt-2 border-t flex justify-between font-bold text-lg">
                    <span>Total :</span>

                    <span>
                      {totalPrix.toFixed(2)} $
                    </span>
                  </div>

                  {/* ==========================
                      BOUTON CONFIRMER
                  ========================== */}

                  <button
                    onClick={ouvrirConfirmation}
                    className="mt-5 w-full p-2 text-amber-600 border-2 border-amber-600 rounded-2xl hover:bg-amber-600 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    Confirmer
                  </button>

                </>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          PORTAIL / MODAL DE CONFIRMATION
      ========================================= */}

      {showConfirmation && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          {/* FOND DU MODAL */}

          <div className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-md text-center">

            {/* ICÔNE */}

            <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-amber-100">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-amber-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>

            </div>

            {/* TITRE */}

            <h2 className="text-2xl font-bold text-red-800 mb-3">
              Confirmation
            </h2>

            {/* MESSAGE */}

            <p className="text-gray-600 mb-4">
              Voulez-vous vraiment confirmer votre commande ?
            </p>

            {/* TOTAL */}

            <div className="bg-amber-50 rounded-xl p-3 mb-6">

              <p className="text-gray-600">
                Total de la commande
              </p>

              <p className="text-2xl font-bold text-amber-600">
                {totalPrix.toFixed(2)} $
              </p>

            </div>

            {/* BOUTONS */}

            <div className="flex justify-center gap-4">

              {/* ANNULER */}

              <button
                onClick={fermerConfirmation}
                className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Annuler
              </button>

              {/* CONFIRMER */}

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