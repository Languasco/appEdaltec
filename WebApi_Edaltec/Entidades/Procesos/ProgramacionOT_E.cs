using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades.Procesos
{
   public  class ProgramacionOT_E
    {
        public int  id_OrdenProgramacion { get; set; }
        public int id_Cliente { get; set; }
        public string  nombre_Cliente { get; set; }
        public string  fechaProgramacion { get; set; }
        public string  ges_Empl_DNI_JefeCuadrilla { get; set; }
        public string  jefeCuadrilla { get; set; }
        public string  cantidadOrdenes { get; set; }
        public string  id_Estado { get; set; }
        public string descripcion_estado { get; set; }
    }
}
