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
    public class tbl_w_TipoReparacionController : ApiController
    {
        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();

        // GET: api/tbl_w_TipoReparacion
        public IQueryable<tbl_w_TipoReparacion> Gettbl_w_TipoReparacion()
        {
            return db.tbl_w_TipoReparacion;
        }

        public object GetTipoReparacion(int opcion, string filtro)
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
                    res.data = obj_negocio.get_tipoReparacionCab(Pub_Esta_Codigo);
                    resul = res;
                }
                else if (opcion == 2)
                {
                    string[] parametros = filtro.Split('|');
                    string nombreTipoReparacion = parametros[0].ToString();

                    var cantidad = db.tbl_w_TipoReparacion.Count(e => e.nombre_TipoReparacion.ToLower() == nombreTipoReparacion.ToLower());

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
        [Route("api/tbl_w_TipoReparacion/PostTipoReparacion")]
        public object PostTipoReparacion(tbl_w_TipoReparacion tbl_w_TipoReparacion)
        {
            Resultado res = new Resultado();
            try
            {
                tbl_w_TipoReparacion.fecha_creacion = DateTime.Now;
                db.tbl_w_TipoReparacion.Add(tbl_w_TipoReparacion);
                db.SaveChanges();

                res.ok = true;
                res.data = tbl_w_TipoReparacion.id_TipoReparacion;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        [HttpPut]
        [Route("api/tbl_w_TipoReparacion/PutTipoReparacion")]
        public object PutTipoReparacion(int id, tbl_w_TipoReparacion tbl_w_TipoReparacion)
        {
            Resultado res = new Resultado();

            tbl_w_TipoReparacion objReemplazar;
            objReemplazar = db.tbl_w_TipoReparacion.Where(a => a.id_TipoReparacion == id).FirstOrDefault<tbl_w_TipoReparacion>();

            objReemplazar.nombre_TipoReparacion = tbl_w_TipoReparacion.nombre_TipoReparacion;
            //objReemplazar.codigo_Anterior = tbl_w_TipoReparacion.codigo_Anterior;
            objReemplazar.id_Estado = tbl_w_TipoReparacion.id_Estado;
            objReemplazar.usuario_edicion = tbl_w_TipoReparacion.usuario_creacion;
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

        // DELETE: api/tbl_w_TipoReparacion/5
        [ResponseType(typeof(tbl_w_TipoReparacion))]
        public IHttpActionResult Deletetbl_w_TipoReparacion(int id)
        {
            tbl_w_TipoReparacion tbl_w_TipoReparacion = db.tbl_w_TipoReparacion.Find(id);
            if (tbl_w_TipoReparacion == null)
            {
                return NotFound();
            }

            db.tbl_w_TipoReparacion.Remove(tbl_w_TipoReparacion);
            db.SaveChanges();

            return Ok(tbl_w_TipoReparacion);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_w_TipoReparacionExists(int id)
        {
            return db.tbl_w_TipoReparacion.Count(e => e.id_TipoReparacion == id) > 0;
        }
    }
}