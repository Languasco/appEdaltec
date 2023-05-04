using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades.Procesos
{
    public class ProgramacionOT_E
    {
        public int id_OrdenTrabajo { get; set; }
        public string area { get; set; }
        public string numeroOrden { get; set; }
        public string cliente { get; set; }
        public string sed { get; set; }
        public string distrito { get; set; }
        public string direccion { get; set; }
        public string jefeCuadrilla { get; set; }
        public string fechaProgramacion { get; set; }
        public string fechaProgramacionFormateado { get; set; }
        public string nroOrden { get; set; }
    }
}
