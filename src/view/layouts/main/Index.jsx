import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from "../header/Header";
import Cadastro from "./Cadastro";
import ListaProdutos from "./ListaProdutos";

function Index() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="listaProdutos" />} />
                <Route path="listaProdutos" element={<ListaProdutos />} />
                <Route path="cadastro" element={<Cadastro />} />
            </Routes>
        </div>
    );
}

export default Index;
