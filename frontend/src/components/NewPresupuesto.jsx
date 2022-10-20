import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePresupuesto, setError } from "../slices/control/controlSlice";
import Error from "./Error";
const NewPresupuesto = () => {
  const [presupuesto, setPresupuesto] = useState(0);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.control.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(presupuesto) <= 0 || isNaN(presupuesto)) {
      dispatch(setError(true));
      return;
    }

    dispatch(setError(false));
    dispatch(savePresupuesto(presupuesto));
  };

  return (
    <section className="newPresupuesto  bg-white w-[30rem] mx-auto why mt-20 rounded-lg shadow-md  px-10 py-6 text-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="content-wrapper flex flex-col"
      >
        <h3 className="text-blue-500 font-bold">Definir Presupuesto</h3>

        <input
          value={presupuesto}
          onChange={(e) => setPresupuesto(e.target.value)}
          type="number"
          className="my-4 bg-slate-100 py-1 text-center"
        />
        <input
          type="submit"
          className="bg-blue-700 text-white font-bold uppercase py-1 px-4 cursor-pointer"
          value="Añadir"
        />
        {error && <Error>No es un número válido</Error>}
      </form>
    </section>
  );
};

export default NewPresupuesto;
