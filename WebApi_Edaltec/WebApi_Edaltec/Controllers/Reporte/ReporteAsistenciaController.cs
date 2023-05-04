using Negocio.Reportes;
using Negocio.Resultados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi_Edaltec.Controllers.Reporte
{

    [EnableCors("*", "*", "*")]
    public class ReporteAsistenciaController : ApiController
    {

        public object GetReporteAsistencia(int opcion, string filtro)
        {
            Resultado res = new Resultado();
            object resul = null;
            try
            {
                if (opcion == 1)
                {
                    string[] parametros = filtro.Split('|');
                    string fechaInicial = parametros[0].ToString();
                    string fechaFinal = parametros[1].ToString();
                    int opcionReporte = Convert.ToInt32(parametros[2].ToString());

                    Reportes_BL obj_negocio = new Reportes_BL(); 
                    resul = obj_negocio.get_asistenciaCab(fechaInicial, fechaFinal, opcionReporte);
 
                }
                else if (opcion == 2)
                {
                    string[] parametros = filtro.Split('|');
                    string fechaInicial = parametros[0].ToString();
                    string fechaFinal = parametros[1].ToString();
                    int opcionReporte = Convert.ToInt32(parametros[2].ToString());

                    Reportes_BL obj_negocio = new Reportes_BL();
                    resul = obj_negocio.GenerarReporte_asistencia(fechaInicial, fechaFinal, opcionReporte);
                }
                else
                {
                    res.ok = false;
                    res.data = "opcion seleccionada invalida..";
                    resul = res;
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
                resul = res;

            }
            return resul;
        }

    }
}
