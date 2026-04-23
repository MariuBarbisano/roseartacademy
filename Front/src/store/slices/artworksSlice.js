import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import toast from 'react-hot-toast';

// Obtener todas las obras
export const fetchArtworks = createAsyncThunk(
  'artworks/fetchAll',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/artworks?${params}`);
      return response.data.artworks;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar obras');
    }
  }
);

// Crear obra
export const createArtwork = createAsyncThunk(
  'artworks/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/artworks', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Obra creada exitosamente');
      return response.data.artwork;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear obra');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Actualizar obra
export const updateArtwork = createAsyncThunk(
  'artworks/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/artworks/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Obra actualizada exitosamente');
      return response.data.artwork;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar obra');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Eliminar obra
export const deleteArtwork = createAsyncThunk(
  'artworks/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/artworks/${id}`);
      toast.success('Obra eliminada exitosamente');
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar obra');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const artworksSlice = createSlice({
  name: 'artworks',
  initialState: {
    artworks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchArtworks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtworks.fulfilled, (state, action) => {
        state.loading = false;
        state.artworks = action.payload;
      })
      .addCase(fetchArtworks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createArtwork.fulfilled, (state, action) => {
        state.artworks.unshift(action.payload);
      })
      // Update
      .addCase(updateArtwork.fulfilled, (state, action) => {
        const index = state.artworks.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.artworks[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteArtwork.fulfilled, (state, action) => {
        state.artworks = state.artworks.filter(a => a.id !== action.payload);
      });
  },
});

export default artworksSlice.reducer;
