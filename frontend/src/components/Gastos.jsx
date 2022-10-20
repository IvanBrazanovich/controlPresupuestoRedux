import React from "react";
import { useSelector } from "react-redux";
import controlSlice from "../slices/control/controlSlice";
import Gasto from "./Gasto";

const Gastos = () => {
  const gastos = useSelector((state) => state.control.gastos);
  console.log(gastos);
  return (
    <section className="mt-10 text-gray-500">
      <h3 className="text-3xl  font-bold">Gastos</h3>
      <div className="gastosWrapper flex flex-col gap-4 py-4">
        {gastos.map((gasto) => {
          return <Gasto key={gasto.id} gasto={gasto} />;
        })}
      </div>
    </section>
  );
};

export default Gastos;
