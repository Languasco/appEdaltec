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
    
    public partial class tbl_w_OT_Cab
    {
        public int id_OT { get; set; }
        public Nullable<int> id_Cliente { get; set; }
        public string nroOT { get; set; }
        public string OT_relacionada { get; set; }
        public Nullable<int> id_CecoEjecutor { get; set; }
        public Nullable<int> id_CecoResponsable { get; set; }
        public string servicios { get; set; }
        public string elemPedOrden { get; set; }
        public Nullable<int> id_Distrito { get; set; }
        public string cod_sets { get; set; }
        public string alimentador { get; set; }
        public string circuito { get; set; }
        public string sed { get; set; }
        public string desTrabajo { get; set; }
        public string observaciones { get; set; }
        public Nullable<System.DateTime> fechaRegistroOT { get; set; }
        public string horaRegistroOT { get; set; }
        public Nullable<System.DateTime> fechaInicioTrabajo { get; set; }
        public string HoraInicioTrabajo { get; set; }
        public Nullable<System.DateTime> fechaFinTrabajo { get; set; }
        public string horaFinTrabajo { get; set; }
        public Nullable<int> id_TipoActividad { get; set; }
        public string origenPresupuestal { get; set; }
        public Nullable<int> id_InspectorEnel { get; set; }
        public string rol { get; set; }
        public Nullable<System.DateTime> fechaImportacion { get; set; }
        public Nullable<System.DateTime> fechaEjecucion { get; set; }
        public Nullable<System.DateTime> Fechatermino { get; set; }
        public Nullable<int> estado { get; set; }
        public Nullable<int> usuario_creacion { get; set; }
        public Nullable<System.DateTime> fecha_creacion { get; set; }
        public Nullable<int> usuario_edicicion { get; set; }
        public Nullable<System.DateTime> fecha_edicion { get; set; }
        public Nullable<int> nroSemana { get; set; }
        public string origenTrabajo { get; set; }
    }
}