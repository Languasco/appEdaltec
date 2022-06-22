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
    public class tbl_w_ServicioController : ApiController
    {
        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();

        // GET: api/tbl_w_Servicio
        public IQueryable<tbl_w_Servicio> Gettbl_w_Servicio()
        {
            return db.tbl_w_Servicio;
        }

        public object GetServicios(int opcion, string filtro)
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
                    res.data = obj_negocio.get_serviciosCab(Pub_Esta_Codigo);
                    resul = res;
                }
                else if (opcion == 2)
                {
                    string[] parametros = filtro.Split('|');
                    string descripcionServicio = parametros[0].ToString();

                    var cantidad = db.tbl_w_Servicio.Count(e =>  (e.nombre_Servicio).ToLower() == descripcionServicio.ToLower() );

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
        [Route("api/tbl_w_Servicio/PostServicios")]
        public object PostServicios(tbl_w_Servicio tbl_w_Servicio)
        {
            Resultado res = new Resultado();
            try
            {
                tbl_w_Servicio.fecha_creacion = DateTime.Now;
                db.tbl_w_Servicio.Add(tbl_w_Servicio);
                db.SaveChanges();

                res.ok = true;
                res.data = tbl_w_Servicio.id_Servicio;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        [HttpPut]
        [Route("api/tbl_w_Servicio/PutServicios")]
        public object PutServicios(int id, tbl_w_Servicio tbl_w_Servicio)
        {
            Resultado res = new Resultado();

            tbl_w_Servicio objReemplazar;
            objReemplazar = db.tbl_w_Servicio.Where(a => a.id_Servicio == id).FirstOrDefault<tbl_w_Servicio>();
 
            objReemplazar.nombre_Servicio = tbl_w_Servicio.nombre_Servicio;
            objReemplazar.abreviatura_Servicio = tbl_w_Servicio.abreviatura_Servicio;
            objReemplazar.id_Estado = tbl_w_Servicio.id_Estado;
            objReemplazar.usuario_edicion = tbl_w_Servicio.usuario_creacion;
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

        // DELETE: api/tbl_w_Servicio/5
        [ResponseType(typeof(tbl_w_Servicio))]
        public IHttpActionResult Deletetbl_w_Servicio(int id)
        {
            tbl_w_Servicio tbl_w_Servicio = db.tbl_w_Servicio.Find(id);
            if (tbl_w_Servicio == null)
            {
                return NotFound();
            }

            db.tbl_w_Servicio.Remove(tbl_w_Servicio);
            db.SaveChanges();

            return Ok(tbl_w_Servicio);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_w_ServicioExists(int id)
        {
            return db.tbl_w_Servicio.Count(e => e.id_Servicio == id) > 0;
        }
    }
}