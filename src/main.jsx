import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import { StoreProvider } from './hooks/useGlobalReducer.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* Envolvemos el router con el proveedor */}
        <StoreProvider>
            <RouterProvider router={router} />
        </StoreProvider>
    </React.StrictMode>
);