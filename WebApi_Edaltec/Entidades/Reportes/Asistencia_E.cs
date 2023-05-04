using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades.Reportes
{
    public class Asistencia_E
    {
        public int id_Asistencia { get; set; }
        public string fechaAsistencia { get; set; }
        public string placa { get; set; }
        public string supervisor { get; set; }
        public string personal { get; set; }
        public string foto { get; set; }
        public string fotoGrupal { get; set; }
        public string latitud { get; set; }
        public string longitud { get; set; }

        public string cargo { get; set; }
        public string nombrePersonal { get; set; }
        public string diasTrabajo { get; set; }

    }
}
