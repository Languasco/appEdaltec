using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Datos;
using Negocio.Mantenimientos;
using Negocio.Resultados;

namespace WebApi_Edaltec.Controllers.Mantenimiento
{
    [EnableCors("*", "*", "*")]
    public class tbl_w_ContratoController : ApiController
    {
        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();

        public object GetContratos(int opcion, string filtro)
        {
            Resultado res = new Resultado();
            object resul = null;
            try
            {
                if (opcion == 1)
                {
                    string[] parametros = filtro.Split('|');
                    string Pub_Esta_Codigo = parametros[0].ToString();

                    Mantenimientos_BL obj_negocio = new Mantenimientos_BL();
                    res.ok = true;
                    res.data = obj_negocio.get_contratosCab(Pub_Esta_Codigo);
                    resul = res;
                }
                else if (opcion == 3)
                {
                    string[] parametros = filtro.Split('|');
                    int idCliente = Convert.ToInt32(parametros[0].ToString());
                    string numeroContrato = parametros[0].ToString();                    

                    var cantidad = db.tbl_w_Contrato.Count(e => e.id_Cliente == idCliente &&  e.numero_Contrato.Trim() == numeroContrato.Trim());

                    res.ok = true;
                    res.data = cantidad > 0 ? true : false;
                    resul = res;

                }
                else
                {
                    resul = "Opcion seleccionada invalida";
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

        [HttpPost]
        [Route("api/tbl_w_Contrato/PostContratos")]
        public object PostContratos(tbl_w_Contrato tbl_w_Contrato)
        {
            Resultado res = new Resultado();
            try
            {
                tbl_w_Contrato.fecha_creacion = DateTime.Now;
                db.tbl_w_Contrato.Add(tbl_w_Contrato);
                db.SaveChanges();

                res.ok = true;
                res.data = tbl_w_Contrato.id_Contrato;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        [HttpPut]
        [Route("api/tbl_w_Contrato/PutContratos")]
        public object PutContratos(int id, tbl_w_Contrato tbl_w_Contrato)
        {
            Resultado res = new Resultado();

            tbl_w_Contrato objReemplazar;
            objReemplazar = db.tbl_w_Contrato.Where(a => a.id_Contrato == id).FirstOrDefault<tbl_w_Contrato>();

            objReemplazar.id_Cliente = tbl_w_Contrato.id_Cliente;
            objReemplazar.numero_Contrato = tbl_w_Contrato.numero_Contrato;
            objReemplazar.observaciones_Contrato = tbl_w_Contrato.observaciones_Contrato;

            objReemplazar.fechaInicio = tbl_w_Contrato.fechaInicio;
            objReemplazar.fechaFinal = tbl_w_Contrato.fechaFinal;

            objReemplazar.id_Estado = tbl_w_Contrato.id_Estado;
            objReemplazar.usuario_edicion = tbl_w_Contrato.usuario_creacion;
            objReemplazar.fecha_edicion = DateTime.Now;

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


        // DELETE: api/tbl_w_Contrato/5
        [ResponseType(typeof(tbl_w_Contrato))]
        public IHttpActionResult Deletetbl_w_Contrato(int id)
        {
            tbl_w_Contrato tbl_w_Contrato = db.tbl_w_Contrato.Find(id);
            if (tbl_w_Contrato == null)
            {
                return NotFound();
            }

            db.tbl_w_Contrato.Remove(tbl_w_Contrato);
            db.SaveChanges();

            return Ok(tbl_w_Contrato);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_w_ContratoExists(int id)
        {
            return db.tbl_w_Contrato.Count(e => e.id_Contrato == id) > 0;
        }
    }
}