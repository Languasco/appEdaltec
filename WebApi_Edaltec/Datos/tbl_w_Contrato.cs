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
    
    public partial class tbl_w_Contrato
    {
        public int id_Contrato { get; set; }
        public Nullable<int> id_Cliente { get; set; }
        public string numero_Contrato { get; set; }
        public string observaciones_Contrato { get; set; }
        public Nullable<System.DateTime> fechaInicio { get; set; }
        public Nullable<System.DateTime> fechaFinal { get; set; }
        public string id_Estado { get; set; }
        public string usuario_creacion { get; set; }
        public Nullable<System.DateTime> fecha_creacion { get; set; }
        public string usuario_edicion { get; set; }
        public Nullable<System.DateTime> fecha_edicion { get; set; }
    }
}
