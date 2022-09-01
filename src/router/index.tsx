import React from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Layout from '../layout'
import Landing from '../pages/landing';
import SimpleNft from "../pages/simpleNft";
import NftGame from '../pages/nftGame/nftGame';

const RouterObj = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Navigate to="/landing" />}></Route>
          <Route path="landing" element={<Landing />}></Route>
          <Route path="simplenft" element={<SimpleNft />}></Route>
          <Route path="nftgame" element={<NftGame />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RouterObj
