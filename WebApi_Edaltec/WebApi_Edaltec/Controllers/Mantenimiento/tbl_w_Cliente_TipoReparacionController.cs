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
    public class tbl_w_Cliente_TipoReparacionController : ApiController
    {
        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();

        // GET: api/tbl_w_Cliente_TipoReparacion
        public IQueryable<tbl_w_Cliente_TipoReparacion> Gettbl_w_Cliente_TipoReparacion()
        {
            return db.tbl_w_Cliente_TipoReparacion;
        }
        
        public object GetPrecioCliente(int opcion, string filtro)
        {
            Resultado res = new Resultado();
            object resul = null;
            try
            {
                if (opcion == 1)
                {
                    string[] parametros = filtro.Split('|');
                    int idCliente = Convert.ToInt32(parametros[0].ToString());
                    int idContrato = Convert.ToInt32(parametros[1].ToString());
                    int idTipoReparacion = Convert.ToInt32(parametros[2].ToString());
                    string nroOT = parametros[3].ToString();
                    string idEstado = parametros[4].ToString();

                    Mantenimientos_BL obj_negocio = new Mantenimientos_BL();
                    res.ok = true;
                    res.data = obj_negocio.get_precioCliente(idCliente, idContrato, idTipoReparacion, nroOT, idEstado);
                    resul = res;
                }
                else if (opcion == 2)
                {
                    string[] parametros = filtro.Split('|');
                    int idCliente = Convert.ToInt32(parametros[0].ToString());

                    res.ok = true;
                    res.data = (from a in db.tbl_w_Contrato
                                where a.id_Cliente == idCliente
                                select new
                                {
                                    a.id_Contrato,
                                    a.numero_Contrato,
                                    a.observaciones_Contrato
                                }).ToList();
                    resul = res;
                }
                else if (opcion == 3)
                {
                    string[] parametros = filtro.Split('|');
                    int idCliente = Convert.ToInt32(parametros[0].ToString());
                    int idContrato = Convert.ToInt32(parametros[1].ToString());
                    int idTipoReparacion = Convert.ToInt32(parametros[2].ToString());


                    var cantidad = db.tbl_w_Cliente_TipoReparacion.Count(e => e.id_Cliente  == idCliente && e.id_Contrato == idContrato && e.id_TipoReparacion == idTipoReparacion);

                    res.ok = true;
                    res.data = cantidad > 0 ? true : false;
                    resul = res;
                }
                else if (opcion == 4)
                {
                    string[] parametros = filtro.Split('|');
                    int id_ClienteTipoReparacion = Convert.ToInt32(parametros[0].ToString());
                    string idUsuario = parametros[1].ToString();

                    Mantenimientos_BL obj_negocio = new Mantenimientos_BL();

                    resul = obj_negocio.set_anularPrecioCliente(id_ClienteTipoReparacion, idUsuario);
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
        [Route("api/tbl_w_Cliente_TipoReparacion/PostPrecioCliente")]
        public object PostPrecioCliente(tbl_w_Cliente_TipoReparacion tbl_w_Cliente_TipoReparacion)
        {
            Resultado res = new Resultado();
            try
            {
                tbl_w_Cliente_TipoReparacion.fecha_creacion = DateTime.Now;
                db.tbl_w_Cliente_TipoReparacion.Add(tbl_w_Cliente_TipoReparacion);
                db.SaveChanges();

                res.ok = true;
                res.data = tbl_w_Cliente_TipoReparacion.id_ClienteTipoReparacion;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        [HttpPut]
        [Route("api/tbl_w_Cliente_TipoReparacion/PutPrecioCliente")]
        public object PutPrecioCliente(int id, tbl_w_Cliente_TipoReparacion tbl_w_Cliente_TipoReparacion)
        {
            Resultado res = new Resultado();

            tbl_w_Cliente_TipoReparacion objReemplazar;
            objReemplazar = db.tbl_w_Cliente_TipoReparacion.Where(v => v.id_ClienteTipoReparacion == id).FirstOrDefault<tbl_w_Cliente_TipoReparacion>();

            // , , , , , id_Estado

            objReemplazar.id_Contrato = tbl_w_Cliente_TipoReparacion.id_Contrato;
            objReemplazar.id_Cliente = tbl_w_Cliente_TipoReparacion.id_Cliente;
            objReemplazar.id_TipoReparacion = tbl_w_Cliente_TipoReparacion.id_TipoReparacion;
            objReemplazar.precio_Cliente = tbl_w_Cliente_TipoReparacion.precio_Cliente;

            objReemplazar.id_Estado = tbl_w_Cliente_TipoReparacion.id_Estado;
            objReemplazar.usuario_edicion = tbl_w_Cliente_TipoReparacion.usuario_creacion;
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


        // DELETE: api/tbl_w_Cliente_TipoReparacion/5
        [ResponseType(typeof(tbl_w_Cliente_TipoReparacion))]
        public IHttpActionResult Deletetbl_w_Cliente_TipoReparacion(int id)
        {
            tbl_w_Cliente_TipoReparacion tbl_w_Cliente_TipoReparacion = db.tbl_w_Cliente_TipoReparacion.Find(id);
            if (tbl_w_Cliente_TipoReparacion == null)
            {
                return NotFound();
            }

            db.tbl_w_Cliente_TipoReparacion.Remove(tbl_w_Cliente_TipoReparacion);
            db.SaveChanges();

            return Ok(tbl_w_Cliente_TipoReparacion);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_w_Cliente_TipoReparacionExists(int id)
        {
            return db.tbl_w_Cliente_TipoReparacion.Count(e => e.id_ClienteTipoReparacion == id) > 0;
        }
    }
}