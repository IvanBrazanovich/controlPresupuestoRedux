import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import controlSlice, { getGastos } from "../slices/control/controlSlice";
import { formatCurrency } from "../helpers/formatCurrency";

const Control = () => {
  const dispatch = useDispatch(controlSlice);
  const presupuesto = useSelector((state) => state.control.presupuesto);
  const gastos = useSelector((state) => state.control.gastos);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    dispatch(getGastos());
  }, []);

  useEffect(() => {
    const calcular = () => {
      const gas = gastos.reduce(
        (total, gasto) => Number(gasto.cantidad) + total,
        0
      );
      setGastado(gas);
    };

    calcular();
  }, [gastos]);

  return (
    <section className="  bg-white mt-10 rounded-lg shadow-md  px-10 py-6 text-center flex">
      <div className="img-container w-1/2"></div>
      <div className="control__container w-1/2">
        <button className="bg-red-500 text-white uppercase font-semibold w-full text-xs py-1 rounded-md ">
          Resetear app
        </button>

        <div className="presupuestos__container text-left flex flex-col gap-2 mt-5">
          <p>
            <span className="text-blue-500 font-semibold">Presupuesto: </span>
            {formatCurrency(presupuesto)}
          </p>
          <p>
            <span className="text-blue-500 font-semibold">Disponible: </span>
            {formatCurrency(presupuesto - gastado)}
          </p>
          <p>
            <span className="text-blue-500 font-semibold">Gastado: </span>{" "}
            {formatCurrency(gastado)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Control;
