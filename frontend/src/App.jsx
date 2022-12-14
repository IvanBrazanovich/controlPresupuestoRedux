import controlSlice, {
  postGasto,
  savePresupuesto,
  setModal,
  getGastos,
} from "./slices/control/controlSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import NewPresupuesto from "./components/NewPresupuesto";
import Control from "./components/Control";
import Modal from "./components/Modal";
import Gastos from "./components/Gastos";

function App() {
  const dispatch = useDispatch();
  const presupRedux = useSelector((state) => state.control.presupuesto);
  const [presupuestoStorage, setPresupuesto] = useState(() => {
    const local = JSON.parse(localStorage.getItem("presupuesto"));
    return local;
  });

  const presupuesto = presupRedux || presupuestoStorage;

  useEffect(() => {
    if (presupuesto) {
      dispatch(savePresupuesto(presupuesto));
    }
  }, [presupuesto, presupRedux, presupuestoStorage]);

  console.log(presupuesto);

  const modal = useSelector((state) => state.control.modal);

  return (
    <main className="App p-1">
      <div className="absolute background h-56 w-full -z-30 top-0 left-0 bg-blue-500"></div>
      <h1 className="text-2xl text-center mt-10 text-white font-bold uppercase">
        Planificador de Gastos
      </h1>
      {!presupuesto ? (
        <NewPresupuesto />
      ) : (
        <div className=" w-[30rem] mx-auto ">
          <Control />
          <button
            onClick={(e) => dispatch(setModal(true))}
            className="addGasto w-6 h-6 text-[2.5rem] text-sky-400 absolute right-6 bottom-6 cursor-pointer"
          >
            <ion-icon name="add-circle"></ion-icon>
          </button>
          <Gastos />
        </div>
      )}

      {modal && <Modal />}
    </main>
  );
}

export default App;
