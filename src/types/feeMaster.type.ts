import type { TRoute } from "./routes.type";

export type TFeeMaster = {
  id: string;
  monthlyFee: number;
  route: Partial<TRoute>;
  createdAt: string;
  updatedAt: string;
};
