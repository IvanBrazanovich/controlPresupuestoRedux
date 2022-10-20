import React from "react";
import iconoCasa from "../img/icono_casa.svg";
import iconoComida from "../img/icono_comida.svg";
import iconoGastos from "../img/icono_gastos.svg";
import iconoOcio from "../img/icono_ocio.svg";
import iconoSalud from "../img/icono_salud.svg";
import iconoSuscripciones from "../img/icono_suscripciones.svg";
import iconoAhorro from "../img/icono_ahorro.svg";
import { formatCurrency } from "../helpers/formatCurrency";

const Gasto = ({ gasto }) => {
  const { nombre, cantidad, categoria } = gasto;
  const diccionario = {
    casa: iconoCasa,
    comida: iconoComida,
    gastos: iconoGastos,
    ocio: iconoOcio,
    salud: iconoSalud,
    suscripciones: iconoSuscripciones,
    ahorro: iconoAhorro,
  };

  return (
    <div className="gasto flex gap-3 shadow-md p-4">
      {/* <img src={imagen} alt="" /> */}
      <img className="h-20" src={diccionario[gasto.categoria]} alt="" />

      <div className=" px-4 info-gasto w-8/12">
        <h2 className="font-bold">{categoria}</h2>
        <p className="text-xl">{nombre}</p>
        <p className="text-blue-500 font-bold mt-2  ">
          {formatCurrency(Number(cantidad))}
        </p>
      </div>

      <div className="btn-wrappers">
        <button className="py-1 bg-blue-600 w-full text-white uppercase font-black text-sm mb-2 rounded-md">
          Editar
        </button>
        <button className="py-1 bg-red-600 w-full text-white uppercase font-black text-sm mb-2 rounded-md">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Gasto;
