import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import controlSlice, { getGastos } from "../slices/control/controlSlice";

const Control = () => {
  const dispatch = useDispatch(controlSlice);

  useEffect(() => {
    dispatch(getGastos());
  }, []);

  const presupuesto = useSelector((state) => state.control.presupuesto);
  return (
    <section className="  bg-white mt-10 rounded-lg shadow-md  px-10 py-6 text-center flex">
      <div className="img-container w-1/2"></div>
      <div className="control__container w-1/2">
        <button className="bg-red-500 text-white uppercase font-semibold w-full text-xs py-1 rounded-md ">
          Resetear app
        </button>

        <div className="presupuestos__container text-left flex flex-col gap-2 mt-5">
          <p>
            <span className="text-blue-500 font-semibold">Presupuesto:</span>$
            {presupuesto}
          </p>
          <p>
            <span className="text-blue-500 font-semibold">Disponible:</span>$
            200
          </p>
          <p>
            <span className="text-blue-500 font-semibold">Gastado:</span>$ 200
          </p>
        </div>
      </div>
    </section>
  );
};

export default Control;
