export enum PathRoute {
  HOME = "HOME",
  INVOICE = "INVOICE",
}

type IRoutePaths = {
  [key in PathRoute]: {
    ROOT: string;
    CREATE?: string;
    VIEW?: string;
    EDIT?: string;
  };
};

export const ROUTE_PATHS: IRoutePaths = {
  HOME: {
    ROOT: "/",
  },
  INVOICE: {
    ROOT: "/invoices",
    CREATE: "/invoices/create",
    VIEW: "/invoices/view/:id",
    EDIT: "/invoices/edit/:id",
  },
};

export const LABELS = {
  HOME: "Accueil",
  INVOICE: "Invoices",
  CREATE: "Créer",
  VIEW: "Voir",
  EDIT: "Modifier",
};
