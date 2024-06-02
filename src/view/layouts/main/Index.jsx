import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from "../header/Header";
import Cadastro from "./Cadastro";
import ListaProdutos from "./ListaProdutos";
import Editar from "./Editar";

function Index() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="listaProdutos" />} />
                <Route path="listaProdutos" element={<ListaProdutos />} />
                <Route path="cadastro" element={<Cadastro />} />
                <Route path="editar/:id" element={<Editar />} />
            </Routes>
        </div>
    );
}

export default Index;
