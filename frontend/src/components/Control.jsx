import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import controlSlice, { getGastos } from "../slices/control/controlSlice";
import { formatCurrency } from "../helpers/formatCurrency";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Control = () => {
  const dispatch = useDispatch(controlSlice);
  const presupuesto = useSelector((state) => state.control.presupuesto);
  const gastos = useSelector((state) => state.control.gastos);
  const [percentage, setPercentage] = useState(0);
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

      const per = ((gas * 100) / presupuesto).toFixed(2);
      console.log(per);
      setPercentage(per);

      setGastado(gas);
    };

    calcular();
  }, [gastos]);

  return (
    <section className="  bg-white mt-10 rounded-lg shadow-md  px-10 py-6 text-center flex">
      <div className="img-container w-1/2">
        <CircularProgressbar
          className="w-10/12 mx-auto"
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathTransitionDuration: 1,
            pathColor: percentage < 100 ? "#60a5fa" : "#dc2626",
          })}
        />
        ;
      </div>
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
