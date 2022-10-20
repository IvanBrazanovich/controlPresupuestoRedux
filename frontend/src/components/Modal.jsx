import React, { useState } from "react";
import {
  setError,
  addGasto,
  setModal,
  postGasto,
  setEdit,
  editGasto,
  setData,
} from "../slices/control/controlSlice";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import { useEffect } from "react";

const Modal = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.control.error);
  const data = useSelector((state) => state.control.data);

  const handleChange = (e) => {
    dispatch(
      setData({
        ...data,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.values(data)
        .map((a) => a.toString().trim())
        .includes("") ||
      Number(data.cantidad) < 0
    ) {
      dispatch(setError(true));
      return;
    }
    dispatch(setError(false));

    //Check if editing
    if (data && data.id !== 0) {
      //Edito
      dispatch(editGasto(data));
      dispatch(
        setData({
          nombre: "",
          cantidad: 0,
          categoria: "",
          id: 0,
        })
      );
    } else {
      //Si pasa añado al redux
      dispatch(postGasto(data));
    }

    //Close modal
    dispatch(setModal(false));
  };

  return (
    <div className="fixed top-0 flex justify-center left-0 right-0 bottom-0 bg-opacity-80 bg-black">
      <div className="modal__window py-5 px-12 rounded-md w-5/12 mt-20   ">
        <h3 className="uppercase  font-bold text-center text-white text-2xl border-b-2 border-blue-500 pb-1">
          Nuevo Gasto
        </h3>

        <form className="mt-5" onSubmit={handleSubmit}>
          {error && (
            <Error>
              Todos los campos son obligatorios y la cantidad debe ser mayor a 0
            </Error>
          )}
          <div className="wrapper flex flex-col gap-3 mb-5">
            <label className="text-white text-xl " htmlFor="nombre">
              Nombre Gasto
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="block rounded-sm px-3 py-1"
              placeholder="Añada el nombre del gasto"
              value={data.nombre}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="wrapper flex flex-col gap-3 mb-5">
            <label className="text-white text-xl " htmlFor="cantidad">
              Cantidad
            </label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              className="block rounded-sm px-3 py-1"
              placeholder="Añada la cantidad del gasto. Ej: 300"
              value={data.cantidad}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="wrapper flex flex-col gap-3 mb-5">
            <label className="text-white text-xl " htmlFor="categoria">
              Nombre Gasto
            </label>
            <select
              name="categoria"
              id="categoria"
              className="block rounded-sm px-3 py-1"
              value={data.categoria}
              onChange={(e) => handleChange(e)}
            >
              <option value="">--Seleccione--</option>
              <option value="casa">Casa</option>
              <option value="comida">Comida</option>
              <option value="gastos">Gastos</option>
              <option value="salud">Salud</option>
              <option value="ocio">Ocio</option>
              <option value="suscripciones">Suscripciones</option>
              <option value="ahorro">Ahorro</option>
            </select>

            <input
              type="submit"
              className="bg-blue-700 font-bold text-white uppercase py-1 mt-4 cursor-pointer"
              value={data && data.id ? "Editar" : "Añadir Gasto"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
