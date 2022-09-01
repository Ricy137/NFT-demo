import React, { useState, useEffect, useContext, createContext } from "react";
import Session from "../utils/session";

export const AccountContext = createContext<AccountCtx>({
  accounts: [],
  isLogin: false,
  setAccounts: () => { },
  setIsLogin: () => { },
});

export const AccountContextProvider = ({ children }) => {
  let ses = new Session();
  let sessionUserBar = ses.getSession("userbar");
  let sessionAccounts = [];
  let sessionIsLogin = false;
  if (sessionUserBar) {
    sessionAccounts = sessionUserBar.accounts;
    sessionIsLogin = sessionUserBar.isLogin;
  } else {
    ses.setSession(
      "userbar",
      { accounts: [""], isLogin: false }
    );
  }
  const [accounts, setAccounts] = useState<string[]>(sessionAccounts);
  const [isLogin, setIsLogin] = useState(sessionIsLogin);

  useEffect(() => {
    let session = new Session();
    session.setSession(
      "userbar",
      {
        accounts: accounts,
        isLogin: isLogin,
      }
    );
  }, [isLogin, accounts]);

  return (
    <AccountContext.Provider
      value={{
        accounts,
        isLogin,
        setAccounts,
        setIsLogin,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const accounts = useContext(AccountContext);
  return accounts;
};
