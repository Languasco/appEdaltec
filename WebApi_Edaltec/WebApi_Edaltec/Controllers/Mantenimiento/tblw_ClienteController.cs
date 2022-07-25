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
    public class tblw_ClienteController : ApiController
    {
        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();

        // GET: api/tblw_Cliente
        public IQueryable<tbl_w_Cliente> Gettbl_w_Cliente()
        {
            return db.tbl_w_Cliente;
        }
        
        public object GetCliente(int opcion, string filtro)
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
                    res.data = obj_negocio.get_clientesCab(Pub_Esta_Codigo);
                    resul = res;
                }
                else if (opcion == 2)
                {
                    string[] parametros = filtro.Split('|');
                    string nombreCliente = parametros[0].ToString();
                    string nroRuc = parametros[1].ToString();

                    var cantidad = db.tbl_w_Cliente.Count(e => (e.nombre_Cliente).ToLower() == nombreCliente.ToLower()  && e.ruc_cliente.Trim() == nroRuc.Trim() );

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
        [Route("api/tblw_Cliente/PostCliente")]
        public object PostCliente(tbl_w_Cliente tbl_w_Cliente)
        {
            Resultado res = new Resultado();
            try
            {
                tbl_w_Cliente.fecha_creacion = DateTime.Now;
                db.tbl_w_Cliente.Add(tbl_w_Cliente);
                db.SaveChanges();

                res.ok = true;
                res.data = tbl_w_Cliente.id_Cliente;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        [HttpPut]
        [Route("api/tblw_Cliente/PutCliente")]
        public object PutCliente(int id, tbl_w_Cliente tbl_w_Cliente)
        {
            Resultado res = new Resultado();

            tbl_w_Cliente objReemplazar;
            objReemplazar = db.tbl_w_Cliente.Where(v => v.id_Cliente == id).FirstOrDefault<tbl_w_Cliente>();

            objReemplazar.nombre_Cliente = tbl_w_Cliente.nombre_Cliente;
            objReemplazar.ruc_cliente = tbl_w_Cliente.ruc_cliente;
            objReemplazar.direccion_cliente = tbl_w_Cliente.direccion_cliente;
            objReemplazar.estado = tbl_w_Cliente.estado;
            objReemplazar.usuario_edicion = tbl_w_Cliente.usuario_creacion;
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

        // DELETE: api/tblw_Cliente/5
        [ResponseType(typeof(tbl_w_Cliente))]
        public IHttpActionResult Deletetbl_w_Cliente(int id)
        {
            tbl_w_Cliente tbl_w_Cliente = db.tbl_w_Cliente.Find(id);
            if (tbl_w_Cliente == null)
            {
                return NotFound();
            }

            db.tbl_w_Cliente.Remove(tbl_w_Cliente);
            db.SaveChanges();

            return Ok(tbl_w_Cliente);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_w_ClienteExists(int id)
        {
            return db.tbl_w_Cliente.Count(e => e.id_Cliente == id) > 0;
        }
    }
}