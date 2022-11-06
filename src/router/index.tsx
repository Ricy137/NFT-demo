import React from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Layout from '../layout'
import Landing from '../pages/landing';
import SimpleNft from "../pages/simpleNft";
import NftGame from '../pages/nftGame/nftGame';

const RouterObj: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route key="landing" path="landing" element={<Landing />} />
          <Route key="simplenft" path="simplenft" element={<SimpleNft />} />
          {/* <Route path="nftgame" element={<NftGame />}></Route> */}
          <Route path="*" element={<Navigate to="/landing" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RouterObj
