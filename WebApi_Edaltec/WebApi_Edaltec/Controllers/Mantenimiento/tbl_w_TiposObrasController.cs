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
    public class tbl_w_TiposObrasController : ApiController
    {
        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();

        // GET: api/tbl_w_TiposObras
        public IQueryable<tbl_w_TiposObras> Gettbl_w_TiposObras()
        {
            return db.tbl_w_TiposObras;
        }

        public object GetTipoObra(int opcion, string filtro)
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
                    res.data = obj_negocio.get_tipoObraCab(Pub_Esta_Codigo);
                    resul = res;
                }
                else if (opcion == 2)
                {
                    Mantenimientos_BL obj_negocio = new Mantenimientos_BL();
                    res.ok = true;
                    res.data = obj_negocio.get_proyectos();
                    resul = res;
                }
                else if (opcion == 3)
                {
                    string[] parametros = filtro.Split('|');
                    string descripcionTipoObra = parametros[0].ToString();

                    var cantidad = db.tbl_w_TiposObras.Count(e => e.descripcion_TipoTrabajo.ToLower() == descripcionTipoObra.ToLower());
                       
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
        [Route("api/tbl_w_TiposObras/PostTiposObras")]
        public object PostTiposObras(tbl_w_TiposObras tbl_w_TiposObras)
        {
            Resultado res = new Resultado();
            try
            {
                tbl_w_TiposObras.fecha_creacion = DateTime.Now;
                db.tbl_w_TiposObras.Add(tbl_w_TiposObras);
                db.SaveChanges();

                res.ok = true;
                res.data = tbl_w_TiposObras.id_TipoTrabajo;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        [HttpPut]
        [Route("api/tbl_w_TiposObras/PutTipoObra")]
        public object PutTipoObra(int id, tbl_w_TiposObras tbl_w_TiposObras)
        {
            Resultado res = new Resultado();

            tbl_w_TiposObras objReemplazar;
            objReemplazar = db.tbl_w_TiposObras.Where(a => a.id_TipoTrabajo == id).FirstOrDefault<tbl_w_TiposObras>();

            objReemplazar.descripcion_TipoTrabajo = tbl_w_TiposObras.descripcion_TipoTrabajo;
            objReemplazar.abreviatura_TipoTrabajo = tbl_w_TiposObras.abreviatura_TipoTrabajo;
            objReemplazar.Ges_Proy_Codigo = tbl_w_TiposObras.Ges_Proy_Codigo;
            objReemplazar.id_Estado = tbl_w_TiposObras.id_Estado;
            objReemplazar.usuario_edicion = tbl_w_TiposObras.usuario_creacion;
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

        // DELETE: api/tbl_w_TiposObras/5
        [ResponseType(typeof(tbl_w_TiposObras))]
        public IHttpActionResult Deletetbl_w_TiposObras(int id)
        {
            tbl_w_TiposObras tbl_w_TiposObras = db.tbl_w_TiposObras.Find(id);
            if (tbl_w_TiposObras == null)
            {
                return NotFound();
            }

            db.tbl_w_TiposObras.Remove(tbl_w_TiposObras);
            db.SaveChanges();

            return Ok(tbl_w_TiposObras);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_w_TiposObrasExists(int id)
        {
            return db.tbl_w_TiposObras.Count(e => e.id_TipoTrabajo == id) > 0;
        }
    }
}