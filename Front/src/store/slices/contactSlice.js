import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import toast from 'react-hot-toast';

// Enviar mensaje de contacto
export const sendContactMessage = createAsyncThunk(
  'contact/send',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/contact', data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al enviar mensaje');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Obtener mensajes (admin)
export const fetchContactMessages = createAsyncThunk(
  'contact/fetchAll',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/contact?${params}`);
      return response.data.messages;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar mensajes');
    }
  }
);

// Marcar como leído
export const markAsRead = createAsyncThunk(
  'contact/markAsRead',
  async ({ id, notes }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/contact/${id}/read`, { notes });
      toast.success('Mensaje marcado como leído');
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al marcar mensaje');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Eliminar mensaje
export const deleteContactMessage = createAsyncThunk(
  'contact/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Mensaje eliminado exitosamente');
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar mensaje');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    messages: [],
    loading: false,
    error: null,
    sendingMessage: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Send Message
      .addCase(sendContactMessage.pending, (state) => {
        state.sendingMessage = true;
      })
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.sendingMessage = false;
      })
      .addCase(sendContactMessage.rejected, (state) => {
        state.sendingMessage = false;
      })
      // Fetch Messages
      .addCase(fetchContactMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContactMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchContactMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Mark As Read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const index = state.messages.findIndex(m => m.id === action.payload.id);
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteContactMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(m => m.id !== action.payload);
      });
  },
});

export default contactSlice.reducer;
