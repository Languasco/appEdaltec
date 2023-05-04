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
    public class tblw_OT_DetController : ApiController
    {
        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();

        // GET: api/tblw_OT_Det
        public IQueryable<tbl_w_OT_Det> Gettbl_w_OT_Det()
        {
            return db.tbl_w_OT_Det;
        }

        // GET: api/tblw_OT_Det/5
        [ResponseType(typeof(tbl_w_OT_Det))]
        public IHttpActionResult Gettbl_w_OT_Det(int id)
        {
            tbl_w_OT_Det tbl_w_OT_Det = db.tbl_w_OT_Det.Find(id);
            if (tbl_w_OT_Det == null)
            {
                return NotFound();
            }

            return Ok(tbl_w_OT_Det);
        }



        [HttpPost]
        [Route("api/tblw_OT_Det/Posttbl_w_OT_Det")]
        public object Posttbl_w_OT_Det(tbl_w_OT_Det tbl_w_OT_Det)
        {
            Resultado res = new Resultado();
            try
            {
                //tbl_w_OT_Det.PAlu_Orde_FecCrea = DateTime.Now;
                db.tbl_w_OT_Det.Add(tbl_w_OT_Det);
                db.SaveChanges();

                res.ok = true;
                res.data = tbl_w_OT_Det.id_Ot_Det;
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
        [Route("api/tblw_OT_Det/Puttbl_w_OT_Det")]
        public object Puttbl_w_OT_Det(int id, tbl_w_OT_Det tbl_w_OT_Det)
        {
            Resultado res = new Resultado();

            tbl_w_OT_Det objReemplazar;
            objReemplazar = db.tbl_w_OT_Det.Where(v => v.id_Ot_Det == id).FirstOrDefault<tbl_w_OT_Det>();
                       
            //objReemplazar.id_Ot_Det = tbl_w_OT_Det.XXXX;
            //objReemplazar.id_Ot = tbl_w_OT_Det.XXXX;
            //objReemplazar.id_TipoTrabajo = tbl_w_OT_Det.id_TipoTrabajo;
            //objReemplazar.item = tbl_w_OT_Det.item;
            objReemplazar.id_Area = tbl_w_OT_Det.id_Area;
            objReemplazar.id_supervisorContratista = tbl_w_OT_Det.id_supervisorContratista;
            objReemplazar.fechaInspeccion = tbl_w_OT_Det.fechaInspeccion;
            objReemplazar.codigoEstructura = tbl_w_OT_Det.codigoEstructura;
            objReemplazar.subTipoEstructura = tbl_w_OT_Det.subTipoEstructura;
            objReemplazar.tipoArmado = tbl_w_OT_Det.tipoArmado;
            objReemplazar.posteInicioDMS = tbl_w_OT_Det.posteInicioDMS;
            objReemplazar.posteFinalDMS = tbl_w_OT_Det.posteFinalDMS;
            objReemplazar.MtMc = tbl_w_OT_Det.MtMc;
            objReemplazar.sedCercana = tbl_w_OT_Det.sedCercana;

            objReemplazar.alimentador = tbl_w_OT_Det.alimentador;
            objReemplazar.circuito = tbl_w_OT_Det.circuito;
            objReemplazar.tipoAnomalia = tbl_w_OT_Det.tipoAnomalia;
            objReemplazar.id_Anomalia = tbl_w_OT_Det.id_Anomalia;
            objReemplazar.codigo_Anomalia = tbl_w_OT_Det.codigo_Anomalia;
            objReemplazar.categoria_Anomalia = tbl_w_OT_Det.categoria_Anomalia;
            objReemplazar.id_SubFamilia_Anomalia = tbl_w_OT_Det.id_SubFamilia_Anomalia;
            objReemplazar.Alcance_Anomalia = tbl_w_OT_Det.Alcance_Anomalia;
            objReemplazar.criticidad_Anomalia = tbl_w_OT_Det.criticidad_Anomalia;
            objReemplazar.id_ObservacionInspeccion = tbl_w_OT_Det.id_ObservacionInspeccion;
            objReemplazar.id_Distrito = tbl_w_OT_Det.id_Distrito;
            objReemplazar.id_Zona = tbl_w_OT_Det.id_Zona;

            objReemplazar.id_ResponsableEnel = tbl_w_OT_Det.id_ResponsableEnel;
            objReemplazar.tamanioPoste = tbl_w_OT_Det.tamanioPoste;
            objReemplazar.id_MatPST = tbl_w_OT_Det.id_MatPST;
            objReemplazar.accesoVehiculo = tbl_w_OT_Det.accesoVehiculo;
            objReemplazar.id_superficie = tbl_w_OT_Det.id_superficie;
            objReemplazar.redesTeleco = tbl_w_OT_Det.redesTeleco;
            objReemplazar.equipoTeleco = tbl_w_OT_Det.equipoTeleco;
            objReemplazar.zocalo = tbl_w_OT_Det.zocalo;
            objReemplazar.mantCalScb = tbl_w_OT_Det.mantCalScb;
            objReemplazar.regisCarg = tbl_w_OT_Det.regisCarg;
            objReemplazar.medPozoTierra = tbl_w_OT_Det.medPozoTierra;
            objReemplazar.inspSCB = tbl_w_OT_Det.inspSCB;
            objReemplazar.termovision = tbl_w_OT_Det.termovision;

            objReemplazar.potenciaTransformador = tbl_w_OT_Det.potenciaTransformador;
            objReemplazar.Marca = tbl_w_OT_Det.Marca;
            objReemplazar.Kardex = tbl_w_OT_Det.Kardex;
            objReemplazar.Mt = tbl_w_OT_Det.Mt;
            objReemplazar.BT = tbl_w_OT_Det.BT;
            objReemplazar.horaToma = tbl_w_OT_Det.horaToma;
            objReemplazar.TernaSCC = tbl_w_OT_Det.TernaSCC;
            objReemplazar.seccionCable = tbl_w_OT_Det.seccionCable;
            objReemplazar.tipoCable = tbl_w_OT_Det.tipoCable;
            objReemplazar.r = tbl_w_OT_Det.r;
            objReemplazar.s = tbl_w_OT_Det.s;
            objReemplazar.t = tbl_w_OT_Det.t;
            objReemplazar.tablero = tbl_w_OT_Det.tablero;
            objReemplazar.llaveBT = tbl_w_OT_Det.llaveBT;
            objReemplazar.terna = tbl_w_OT_Det.terna;

            objReemplazar.seccion = tbl_w_OT_Det.seccion;
            objReemplazar.material = tbl_w_OT_Det.material;
            objReemplazar.tipo = tbl_w_OT_Det.tipo;
            objReemplazar.fusible = tbl_w_OT_Det.fusible;
            objReemplazar.Cap = tbl_w_OT_Det.Cap;
            objReemplazar.r2 = tbl_w_OT_Det.r2;
            objReemplazar.s2 = tbl_w_OT_Det.s2;
            objReemplazar.t2 = tbl_w_OT_Det.t2;
            objReemplazar.Sub_Cod_PFPSRC = tbl_w_OT_Det.Sub_Cod_PFPSRC;

            objReemplazar.Sub_Tipo_Estruc = tbl_w_OT_Det.Sub_Tipo_Estruc;
            objReemplazar.TipoTablero = tbl_w_OT_Det.TipoTablero;
            objReemplazar.set_DE = tbl_w_OT_Det.set_DE;
            objReemplazar.codigo_DE = tbl_w_OT_Det.codigo_DE;
            objReemplazar.Deficiencia_Enel = tbl_w_OT_Det.Deficiencia_Enel;
            objReemplazar.Observacion_Inspeccion = tbl_w_OT_Det.Observacion_Inspeccion;
            objReemplazar.MantCali_Fecha = tbl_w_OT_Det.MantCali_Fecha;
            objReemplazar.MantCali_CantidadLLave = tbl_w_OT_Det.MantCali_CantidadLLave;
            objReemplazar.MantCali_Material = tbl_w_OT_Det.MantCali_Material;



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


        // DELETE: api/tblw_OT_Det/5
        [ResponseType(typeof(tbl_w_OT_Det))]
        public IHttpActionResult Deletetbl_w_OT_Det(int id)
        {
            tbl_w_OT_Det tbl_w_OT_Det = db.tbl_w_OT_Det.Find(id);
            if (tbl_w_OT_Det == null)
            {
                return NotFound();
            }

            db.tbl_w_OT_Det.Remove(tbl_w_OT_Det);
            db.SaveChanges();

            return Ok(tbl_w_OT_Det);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_w_OT_DetExists(int id)
        {
            return db.tbl_w_OT_Det.Count(e => e.id_Ot_Det == id) > 0;
        }
    }
}