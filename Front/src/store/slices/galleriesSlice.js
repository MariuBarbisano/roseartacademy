import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import toast from 'react-hot-toast';

// Obtener todas las galerías
export const fetchGalleries = createAsyncThunk(
  'galleries/fetchAll',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/galleries?${params}`);
      return response.data.galleries;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar galerías');
    }
  }
);

// Obtener galería por slug o ID
export const fetchGalleryBySlug = createAsyncThunk(
  'galleries/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/galleries/${slug}`);
      return response.data.gallery;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar galería');
    }
  }
);

// Crear galería
export const createGallery = createAsyncThunk(
  'galleries/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/galleries', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Galería creada exitosamente');
      return response.data.gallery;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear galería');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Actualizar galería
export const updateGallery = createAsyncThunk(
  'galleries/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/galleries/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Galería actualizada exitosamente');
      return response.data.gallery;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar galería');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Eliminar galería
export const deleteGallery = createAsyncThunk(
  'galleries/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/galleries/${id}`);
      toast.success('Galería eliminada exitosamente');
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar galería');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const galleriesSlice = createSlice({
  name: 'galleries',
  initialState: {
    galleries: [],
    currentGallery: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentGallery: (state) => {
      state.currentGallery = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchGalleries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGalleries.fulfilled, (state, action) => {
        state.loading = false;
        state.galleries = action.payload;
      })
      .addCase(fetchGalleries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch By Slug
      .addCase(fetchGalleryBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGalleryBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGallery = action.payload;
      })
      .addCase(fetchGalleryBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createGallery.fulfilled, (state, action) => {
        state.galleries.unshift(action.payload);
      })
      // Update
      .addCase(updateGallery.fulfilled, (state, action) => {
        const index = state.galleries.findIndex(g => g.id === action.payload.id);
        if (index !== -1) {
          state.galleries[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteGallery.fulfilled, (state, action) => {
        state.galleries = state.galleries.filter(g => g.id !== action.payload);
      });
  },
});

export const { clearCurrentGallery } = galleriesSlice.actions;
export default galleriesSlice.reducer;
