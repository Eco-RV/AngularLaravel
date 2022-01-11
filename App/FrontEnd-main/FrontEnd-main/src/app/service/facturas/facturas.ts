export interface Facturas {
  usuario_id: number;
  tot: number;
}
export interface Desglose {
  facturas_id: number;
  producto_id: number;
  cantidad: number;
  pre_tot: number;
}
export interface factura {
    id: number;
}

