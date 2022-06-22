using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Datos;
using Negocio.Resultados;

namespace WebApi_Edaltec.Controllers.Proceso
{

    [EnableCors("*", "*", "*")]

    public class Prj_MPrv_LiquidacionTrabController : ApiController
    {
        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();

        // GET: api/Prj_MPrv_LiquidacionTrab
        public IQueryable<Prj_MPrv_LiquidacionTrab> GetPrj_MPrv_LiquidacionTrab()
        {
            return db.Prj_MPrv_LiquidacionTrab;
        }

        // GET: api/Prj_MPrv_LiquidacionTrab/5
        [ResponseType(typeof(Prj_MPrv_LiquidacionTrab))]
        public IHttpActionResult GetPrj_MPrv_LiquidacionTrab(int id)
        {
            Prj_MPrv_LiquidacionTrab prj_MPrv_LiquidacionTrab = db.Prj_MPrv_LiquidacionTrab.Find(id);
            if (prj_MPrv_LiquidacionTrab == null)
            {
                return NotFound();
            }

            return Ok(prj_MPrv_LiquidacionTrab);
        }
               

        [HttpPost]
        [Route("api/Prj_MPrv_LiquidacionTrab/PostPrj_MPrv_LiquidacionTrab")]
        public object PostPrj_MPrv_LiquidacionTrab(Prj_MPrv_LiquidacionTrab Prj_MPrv_LiquidacionTrab)
        {
            Resultado res = new Resultado();
            try
            {
                Prj_MPrv_LiquidacionTrab.PAlu_Orde_FecCrea = DateTime.Now;
                db.Prj_MPrv_LiquidacionTrab.Add(Prj_MPrv_LiquidacionTrab);
                db.SaveChanges();

                res.ok = true;
                res.data = Prj_MPrv_LiquidacionTrab.id_OT;
            }
            catch (DbEntityValidationException e)
            {
                res.ok = false;              
                foreach (var eve in e.EntityValidationErrors)
                {
                    foreach (var ve in eve.ValidationErrors)
                    {
                        res.data = ve.ErrorMessage;
                        break;
                    }
                } 
            }
            return res;
        }

        [HttpPut]
        [Route("api/Prj_MPrv_LiquidacionTrab/PutPrj_MPrv_LiquidacionTrab")]
        public object PutPrj_MPrv_LiquidacionTrab(int id, Prj_MPrv_LiquidacionTrab Prj_MPrv_LiquidacionTrab)
        {
            Resultado res = new Resultado();

            Prj_MPrv_LiquidacionTrab objReemplazar;
            objReemplazar = db.Prj_MPrv_LiquidacionTrab.Where(v => v.id_OT == id).FirstOrDefault<Prj_MPrv_LiquidacionTrab>();
 
            objReemplazar.PMPr_LiqT_Codigo = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_Codigo;
            objReemplazar.PMPr_LiqT_OT = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_OT;
            objReemplazar.PMPr_SecC_Codigo = Prj_MPrv_LiquidacionTrab.PMPr_SecC_Codigo;
            objReemplazar.Ges_Ctto_NroContrato = Prj_MPrv_LiquidacionTrab.Ges_Ctto_NroContrato;

            objReemplazar.id_Cliente = Prj_MPrv_LiquidacionTrab.id_Cliente;
            objReemplazar.PMPr_Ceco_Codigo = Prj_MPrv_LiquidacionTrab.PMPr_Ceco_Codigo;
            objReemplazar.PMPr_LiqT_SIE = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_SIE;
            objReemplazar.PMPr_LiqT_Sed = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_Sed;

            objReemplazar.PMPr_LiqT_Descripcion = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_Descripcion;
            objReemplazar.PMPr_LiqT_Alimentador = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_Alimentador;
            objReemplazar.PMPr_LiqT_Circuito = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_Circuito;
            objReemplazar.PMPr_LiqT_DGruZona = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_DGruZona;
            objReemplazar.PMPr_LiqT_DGruProceso = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_DGruProceso;

            objReemplazar.PMPr_LiqT_Semana = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_Semana;
            objReemplazar.PMPr_LiqT_DGruActividad = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_DGruActividad;
            objReemplazar.PMPr_LiqT_DGruSubActividad = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_DGruSubActividad;
            objReemplazar.PMPr_Resp_Codigo = Prj_MPrv_LiquidacionTrab.PMPr_Resp_Codigo;
            objReemplazar.Ges_Empl_DNI = Prj_MPrv_LiquidacionTrab.Ges_Empl_DNI;
            objReemplazar.id_Distrito = Prj_MPrv_LiquidacionTrab.id_Distrito;

            objReemplazar.PAlu_Orde_FechaRegistro = Prj_MPrv_LiquidacionTrab.PAlu_Orde_FechaRegistro;
            objReemplazar.PMPr_LiqT_Inicio = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_Inicio;
            objReemplazar.PMPr_LiqT_Termino = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_Termino;
            objReemplazar.PAlu_Orde_FechaEjecucion = Prj_MPrv_LiquidacionTrab.PAlu_Orde_FechaEjecucion;
            objReemplazar.PAlu_Orde_FechaEjecucionHora = Prj_MPrv_LiquidacionTrab.PAlu_Orde_FechaEjecucionHora;
            objReemplazar.PAlu_Orde_FechaLiquidacion = Prj_MPrv_LiquidacionTrab.PAlu_Orde_FechaLiquidacion;
            objReemplazar.PMPr_LiqT_Observaciones = Prj_MPrv_LiquidacionTrab.PMPr_LiqT_Observaciones;
            objReemplazar.Pub_Esta_Codigo = Prj_MPrv_LiquidacionTrab.Pub_Esta_Codigo;
            objReemplazar.PAlu_Orde_UsuModi = Prj_MPrv_LiquidacionTrab.PAlu_Orde_UsuCrea;
            objReemplazar.PAlu_Orde_FecModi = DateTime.Now;


            db.Entry(objReemplazar).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
                res.ok = true;
                res.data = "OK";
            }
            catch (DbUpdateConcurrencyException ex)
            {
                res.ok = false;
                res.data = ex.InnerException.Message;

            }
            return res;
        }

        // DELETE: api/Prj_MPrv_LiquidacionTrab/5
        [ResponseType(typeof(Prj_MPrv_LiquidacionTrab))]
        public IHttpActionResult DeletePrj_MPrv_LiquidacionTrab(int id)
        {
            Prj_MPrv_LiquidacionTrab prj_MPrv_LiquidacionTrab = db.Prj_MPrv_LiquidacionTrab.Find(id);
            if (prj_MPrv_LiquidacionTrab == null)
            {
                return NotFound();
            }

            db.Prj_MPrv_LiquidacionTrab.Remove(prj_MPrv_LiquidacionTrab);
            db.SaveChanges();

            return Ok(prj_MPrv_LiquidacionTrab);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Prj_MPrv_LiquidacionTrabExists(int id)
        {
            return db.Prj_MPrv_LiquidacionTrab.Count(e => e.id_OT == id) > 0;
        }
    }
}