import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  presupuesto: 0,
  error: false,
  gastos: [],
  modal: false,
  data: {
    nombre: "",
    cantidad: 0,
    categoria: "",
    id: 0,
  },
};

export const postGasto = createAsyncThunk(
  "Presupuesto/postGasto",
  async (gasto) => {
    const res = await fetch("http://localhost:4000/gastos", {
      method: "POST",
      body: JSON.stringify(gasto),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  }
);
export const delGastos = createAsyncThunk(
  "Presupuesto/delGastos",
  async (gasto) => {
    const res = await fetch("http://localhost:4000/gastos", {
      method: "DELETE",
      body: JSON.stringify(gasto),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  }
);

export const editGasto = createAsyncThunk(
  "Presupuesto/editGasto",
  async (gasto) => {
    const res = await fetch("http://localhost:4000/gastos", {
      method: "PUT",
      body: JSON.stringify(gasto),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  }
);

export const getGastos = createAsyncThunk("Presupuesto/getGastos", async () => {
  const res = await fetch("http://localhost:4000/gastos");
  const result = await res.json();

  return result;
});

export const delGasto = createAsyncThunk(
  "Presupuesto/deleteGasto",
  async (gasto) => {
    const res = await fetch("http://localhost:4000/gasto", {
      method: "DELETE",
      body: JSON.stringify(gasto),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    return result;
  }
);

export const controlSlice = createSlice({
  name: "Presupuesto",
  initialState,
  reducers: {
    savePresupuesto: (state, action) => {
      state.presupuesto = action.payload;
      localStorage.setItem("presupuesto", action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postGasto.pending, (state, action) => {})
      .addCase(postGasto.fulfilled, (state, action) => {
        console.log("El gasto se subió correctamente");
        state.gastos = [...state.gastos, action.payload];
      })
      .addCase(postGasto.rejected, (state, action) => {
        console.log("Se negó brother", action.payload);
      })
      .addCase(getGastos.pending, (state, action) => {})
      .addCase(getGastos.fulfilled, (state, action) => {
        state.gastos = action.payload;
      })
      .addCase(getGastos.rejected, (state, action) => {
        console.log("Se negó");
        state.gastos = [];
      })
      .addCase(delGasto.fulfilled, (state, action) => {
        state.gastos = state.gastos.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(editGasto.fulfilled, (state, action) => {
        state.gastos = state.gastos.map((gas) =>
          gas.id === action.payload.id ? action.payload : gas
        );
      });
  },
});

export const {
  setData,
  savePresupuesto,
  setError,
  setModal,
  addGasto,
  setEdit,
} = controlSlice.actions;

export default controlSlice.reducer;
