import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchAllAdmins = createAsyncThunk(
    "admin/fetchAllAdmins",
    async ({ limit = 2, page = 1 }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/v1/users?limit=${limit}&page=${page}&role=admin`);
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "An error occurred.";
            const errorStatus = error.status || 500;
            return rejectWithValue({ status: errorStatus, message: errorMessage });
        }
    }
);

export const fetchAdmin = createAsyncThunk(
    "admin/fetchAdmin",
    async (id) => {
        const response = await api.get(`/api/v1/users/${id}`);
        return response.data;
    }
);

export const deleteAdmin = createAsyncThunk(
    "admin/deleteAdmin",
    async (id) => {
        await api.delete(`api/v1/users/${id}`);
        return id;
    }
);

export const createAdmin = createAsyncThunk(
    "admin/createAdmin",
    async (
        { username,
            name,
            email,
            password,
            confirmPassword,
            image,
            permission,
        },
        { rejectWithValue }
    ) => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("confirmPassword", confirmPassword);
            formData.append("image", image);
            formData.append("permission", permission);
            const response = await api.post("/api/v1/users", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            console.log("error", error || error.message)
            return rejectWithValue(error || error.message);
        }
    }
);

export const updateAdmin = createAsyncThunk(
    "admin/updateAdmin",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/v1/users/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "An error occurred during the update." }
            );
        }
    }
);


export const updateAdminPassword = createAsyncThunk(
    "admin/updateAdminPassword",
    async (
        { id,
            data
        }, { rejectWithValue },
    ) => {
        try {
            const response = await api.put(`/api/v1/users/${id}/changeUserPassword`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            return rejectWithValue(
                error.response?.data || { message: "An error occurred during update" }
            );
        }
    }
);

export const addAdminWork = createAsyncThunk(
    "admin/addAdminWork",
    async (
        { id,
            data
        }, { rejectWithValue },
    ) => {
        try {
            const response = await api.put(`/api/v1/users/${id}/work`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            return rejectWithValue(
                error.response?.data || { message: "An error occurred during update" }
            );
        }
    }
);

export const deleteAdminWork = createAsyncThunk(
    "admin/deleteAdminSection",
    async (
        { id, data }, { rejectWithValue },
    ) => {
        try {
            const response = await api.delete(`/api/v1/users/${id}/work`, {
                headers: {
                    "Content-Type": "application/json",
                },
                data,
            });
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            return rejectWithValue(
                error.response?.data || { message: "An error occurred during deletion" }
            );
        }
    }
);

export const addAdminSection = createAsyncThunk(
    "admin/addAdminSection",
    async (
        { id,
            data
        }, { rejectWithValue },
    ) => {
        try {
            const response = await api.put(`/api/v1/users/${id}/sections`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            return rejectWithValue(
                error.response?.data || { message: "An error occurred during update" }
            );
        }
    }
);

export const deleteAdminSection = createAsyncThunk(
    "admin/deleteAdminSection",
    async (
        { id, data }, { rejectWithValue },
    ) => {
        try {
            const response = await api.delete(`/api/v1/users/${id}/sections`, {
                headers: {
                    "Content-Type": "application/json",
                },
                data,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "An error occurred during deletion" }
            );
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        data: [],
        admin: {},
        status: null,
        personStatus: null,
        error: null,
        currentPage: 1,
        totalPages: 1,
    },
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAdmins.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllAdmins.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data;
                state.totalPages = action.payload.pagination.numberOfPages;
            })
            .addCase(fetchAllAdmins.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            }).addCase(fetchAdmin.pending, (state) => {
                state.personStatus = "loading";
            })
            .addCase(fetchAdmin.fulfilled, (state, action) => {
                state.personStatus = "succeeded";
                state.admin = action.payload.data;
            })
            .addCase(fetchAdmin.rejected, (state, action) => {
                state.personStatus = "failed";
                state.error = action.error.message;
            }).addCase(updateAdmin.pending, (state) => {
                state.personStatus = "loading";
            })
            .addCase(updateAdmin.fulfilled, (state) => {
                state.personStatus = "succeeded";
            })
            .addCase(updateAdmin.rejected, (state, action) => {
                state.personStatus = "failed";
                state.error = action.error.message;
            })

    },
});
export const { setPage } = adminSlice.actions;

export default adminSlice.reducer;
