import styles from './App.module.css';

function App() {
  return <>
<div className={`  text-white p-4`} >
     <h1 >Hello, Tailwind CSS!</h1>
    <button className= { ` ${ styles.containe} bg-amber-600 ` } >
      cliquer
    </button>

    </div>

  </>;

}


export default App;