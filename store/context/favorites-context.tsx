import { createContext, useState } from "react";

export type FavoritesContextType = {
  ids: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  ids: [],
  addFavorite: (id: string) => {},
  removeFavorite: (id: string) => {},
});

const FavoritesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ids, setIds] = useState<FavoritesContextType["ids"]>([]);

  const addFavorite = (id: string) => {
    setIds((prev) => [...prev, id]);
  };

  const removeFavorite = (id: string) => {
    setIds((prev) => prev.filter((item) => item !== id));
  };

  const value = {
    ids: ids,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
