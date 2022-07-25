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
    public class tblw_Marca_VehiculoController : ApiController
    {
        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();


        public object GetMarcaVehiculo(int opcion, string filtro)
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
                    res.data = obj_negocio.get_marcaVehiculosCab(Pub_Esta_Codigo);
                    resul = res;
                }
                else if (opcion == 3)
                {
                    string[] parametros = filtro.Split('|');
                    string nombreMarca = parametros[0].ToString();

                    var cantidad = db.tbl_w_Marca_Vehiculo.Count(e => e.nombre_Marca.ToLower() == nombreMarca.ToLower());

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
        [Route("api/tblw_Marca_Vehiculo/PostMarcaVehiculo")]
        public object PostMarcaVehiculo(tbl_w_Marca_Vehiculo tbl_w_Marca_Vehiculo)
        {
            Resultado res = new Resultado();
            try
            {
                tbl_w_Marca_Vehiculo.fecha_creacion = DateTime.Now;
                db.tbl_w_Marca_Vehiculo.Add(tbl_w_Marca_Vehiculo);
                db.SaveChanges();

                res.ok = true;
                res.data = tbl_w_Marca_Vehiculo.id_Marca;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        [HttpPut]
        [Route("api/tblw_Marca_Vehiculo/PutMarcaVehiculo")]
        public object PutMarcaVehiculo(int id, tbl_w_Marca_Vehiculo tbl_w_Marca_Vehiculo)
        {
            Resultado res = new Resultado();

            tbl_w_Marca_Vehiculo objReemplazar;
            objReemplazar = db.tbl_w_Marca_Vehiculo.Where(a => a.id_Marca == id).FirstOrDefault<tbl_w_Marca_Vehiculo>();

            objReemplazar.nombre_Marca = tbl_w_Marca_Vehiculo.nombre_Marca;
            objReemplazar.id_Estado = tbl_w_Marca_Vehiculo.id_Estado;
            objReemplazar.usuario_edicion = tbl_w_Marca_Vehiculo.usuario_creacion;
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




        // DELETE: api/tblw_Marca_Vehiculo/5
        [ResponseType(typeof(tbl_w_Marca_Vehiculo))]
        public IHttpActionResult Deletetbl_w_Marca_Vehiculo(int id)
        {
            tbl_w_Marca_Vehiculo tbl_w_Marca_Vehiculo = db.tbl_w_Marca_Vehiculo.Find(id);
            if (tbl_w_Marca_Vehiculo == null)
            {
                return NotFound();
            }

            db.tbl_w_Marca_Vehiculo.Remove(tbl_w_Marca_Vehiculo);
            db.SaveChanges();

            return Ok(tbl_w_Marca_Vehiculo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_w_Marca_VehiculoExists(int id)
        {
            return db.tbl_w_Marca_Vehiculo.Count(e => e.id_Marca == id) > 0;
        }
    }
}