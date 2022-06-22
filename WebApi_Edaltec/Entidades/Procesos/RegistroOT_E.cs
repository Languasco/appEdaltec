using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades.Procesos
{
   public class RegistroOT_E
    {

        public string idEstado { get; set; }
        public string descripcionEstado { get; set; }
        public string nroOT { get; set; }
        public string cliente { get; set; }
        public string ceco { get; set; }
        public string servicio { get; set; }
        public string circuito { get; set; }
        public string alimentador { get; set; }
        public string fechaRegistro { get; set; }
        public string fechaEjecucion { get; set; }
        public string fechaLiquidacion { get; set; }

        public int id_OT { get; set; } 
        public string PMPr_LiqT_Codigo { get; set; }
        public string PMPr_LiqT_OT { get; set; }
        public string PMPr_SecC_Codigo { get; set; }
        public string Ges_Ctto_NroContrato { get; set; }
        public string id_Cliente { get; set; }
        public string PMPr_Ceco_Codigo { get; set; }
        public string PMPr_LiqT_SIE { get; set; }
        public string PMPr_LiqT_Sed { get; set; }
        public string PMPr_LiqT_Descripcion { get; set; }
        public string PMPr_LiqT_Alimentador { get; set; }
        public string PMPr_LiqT_Circuito { get; set; }
        public string PMPr_LiqT_DGruZona { get; set; }
        public string PMPr_LiqT_DGruProceso { get; set; }
        public string PMPr_LiqT_Semana { get; set; }
        public string PMPr_LiqT_DGruActividad { get; set; }
        public string PMPr_LiqT_DGruSubActividad { get; set; }
        public string PMPr_Resp_Codigo { get; set; }
        public string Ges_Empl_DNI { get; set; }
        public string id_Distrito { get; set; }
        public string PAlu_Orde_FechaRegistro { get; set; }
        public string PMPr_LiqT_Inicio { get; set; }
        public string PMPr_LiqT_Termino { get; set; }
        public string PAlu_Orde_FechaEjecucion { get; set; }
        public string PAlu_Orde_FechaEjecucionHora { get; set; }
        public string PAlu_Orde_FechaLiquidacion { get; set; }
        public string PMPr_LiqT_Observaciones { get; set; }
        public string Pub_Esta_Codigo { get; set; }
    }

    public class RegistroBases_E
    {
        public int id_Ot_Det { get; set; }
        public string codigoEstructura { get; set; } 
        public string subTipoEstructura { get; set; }
        public string deficienciaEnel { get; set; }
        public string categoria { get; set; }
        public string observaciones { get; set; }
    }

    public class RegistroOTNew_W {
        public int id_OT { get; set; }
        public string nroFolio { get; set; }
        public string nroOrden { get; set; }
        public string nroCliente { get; set; }
        public string fechaElectrica { get; set; }
        public string fechaEjecucion { get; set; }
        public string tipoTrabajo { get; set; }
        public string fecha { get; set; }
        public string distrito { get; set; }
        public string descripcionEstado { get; set; }
    }

 }
