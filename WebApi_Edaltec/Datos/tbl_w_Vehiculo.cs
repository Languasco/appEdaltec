//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Datos
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_w_Vehiculo
    {
        public int id_Vehiculo { get; set; }
        public Nullable<int> id_TipoVehiculo { get; set; }
        public string nroPlaca_Vehiculo { get; set; }
        public Nullable<int> id_Marca { get; set; }
        public string modelo_vehiculo { get; set; }
        public string color_Vehiculo { get; set; }
        public string nroMotor_Vehiculo { get; set; }
        public string nroChasis_Vehiculo { get; set; }
        public Nullable<int> id_Categoria { get; set; }
        public Nullable<int> id_Carroceria { get; set; }
        public Nullable<int> anio_Vehiculo { get; set; }
        public Nullable<decimal> cilidraje_Vehiculo { get; set; }
        public Nullable<int> id_Combustible { get; set; }
        public Nullable<decimal> kmInicial_Vehiculo { get; set; }
        public Nullable<decimal> kmMant_Vehiculo { get; set; }
        public string dni_Conductor { get; set; }
        public string ruc_Proveedor { get; set; }
        public string id_Estado { get; set; }
        public string usuario_creacion { get; set; }
        public Nullable<System.DateTime> fecha_creacion { get; set; }
        public string usuario_edicion { get; set; }
        public Nullable<System.DateTime> fecha_edicion { get; set; }
    }
}
