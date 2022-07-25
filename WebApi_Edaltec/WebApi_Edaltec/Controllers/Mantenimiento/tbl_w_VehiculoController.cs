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
    public class tbl_w_VehiculoController : ApiController
    {
        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();

        // GET: api/tbl_w_Vehiculo
        public IQueryable<tbl_w_Vehiculo> Gettbl_w_Vehiculo()
        {
            return db.tbl_w_Vehiculo;
        }


        public object GetVehiculo(int opcion, string filtro)
        {
            Resultado res = new Resultado();
            object resul = null;
            try
            {
                if (opcion == 1)
                {
                    string[] parametros = filtro.Split('|');
                    string idEstado = parametros[0].ToString();

                    Mantenimientos_BL obj_negocio = new Mantenimientos_BL();
                    res.ok = true;
                    res.data = obj_negocio.get_vehiculos(idEstado);
                    resul = res;
                }
                else if (opcion == 2)
                {
                    string[] parametros = filtro.Split('|');
                    int id_Vehiculo = Convert.ToInt32(parametros[0].ToString());
                    string idUsuario = parametros[1].ToString();

                    Mantenimientos_BL obj_negocio = new Mantenimientos_BL();

                    resul = obj_negocio.set_anularVehiculo(id_Vehiculo, idUsuario);
                }

                else if (opcion == 3)
                {
                    res.ok = true;
                    res.data = (from a in db.tbl_w_Tipo_Vehiculo
                                //where a.estado == 1
                                select new
                                {
                                    a.id_TipoVehiculo,
                                    a.nombre_TipoVehiculo,
                                }).ToList();
                    resul = res;
                }
                else if (opcion == 4)
                {
                    res.ok = true;
                    res.data = (from a in db.tbl_w_Marca_Vehiculo
                                    where a.id_Estado == "001"
                                select new
                                {
                                    a.id_Marca,
                                    a.nombre_Marca,
                                }).ToList();
                    resul = res;
                }
                else if (opcion == 5)
                {
                    string[] parametros = filtro.Split('|');
                    int id_TipoVehiculo = Convert.ToInt32(parametros[0].ToString());

                    res.ok = true;
                    res.data = (from a in db.tbl_w_Categoria_Vehiculo
                                where a.id_TipoVehiculo == id_TipoVehiculo
                                select new
                                {
                                    a.id_Categoria,
                                    a.nombre_Categoria,
                                }).ToList();
                    resul = res;
                }
                else if (opcion == 6)
                {
                    string[] parametros = filtro.Split('|');
                    int id_Categoria = Convert.ToInt32(parametros[0].ToString());

                    res.ok = true;
                    res.data = (from a in db.tbl_w_Carroceria_Vehiculo
                                //where a.id_Categoria == id_Categoria
                                select new
                                {
                                    a.id_Carroceria,
                                    a.nombre_Carroceria,
                                }).ToList();
                    resul = res;
                }
                else if (opcion == 7)
                {
                    string[] parametros = filtro.Split('|');
                    string nroPlaca_Vehiculo = parametros[0].ToString();

                    var cantidad = db.tbl_w_Vehiculo.Count(e => e.nroPlaca_Vehiculo == nroPlaca_Vehiculo);

                    res.ok = true;
                    res.data = cantidad > 0 ? true : false;
                    resul = res;
                }
                else if (opcion == 8)
                {

                    Mantenimientos_BL obj_negocio = new Mantenimientos_BL();
                    res.ok = true;
                    res.data = obj_negocio.get_dniConductores();
                    resul = res;
                }
                else
                {
                    res.ok = false;
                    res.data = "Opcion seleccionada invalida..";
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

        [HttpPost]
        [Route("api/tbl_w_Vehiculo/PostVehiculo")]
        public object PostVehiculo(tbl_w_Vehiculo tbl_w_Vehiculo)
        {
            Resultado res = new Resultado();
            try
            {
                tbl_w_Vehiculo.fecha_creacion = DateTime.Now;
                db.tbl_w_Vehiculo.Add(tbl_w_Vehiculo);
                db.SaveChanges();

                res.ok = true;
                res.data = tbl_w_Vehiculo.id_Vehiculo;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        [HttpPut]
        [Route("api/tbl_w_Vehiculo/PutVehiculo")]
        public object PutVehiculo(int id, tbl_w_Vehiculo tbl_w_Vehiculo)
        {
            Resultado res = new Resultado();

            tbl_w_Vehiculo objReemplazar;
            objReemplazar = db.tbl_w_Vehiculo.Where(v => v.id_Vehiculo == id).FirstOrDefault<tbl_w_Vehiculo>();

            objReemplazar.id_TipoVehiculo = tbl_w_Vehiculo.id_TipoVehiculo;
            objReemplazar.nroPlaca_Vehiculo = tbl_w_Vehiculo.nroPlaca_Vehiculo;
            objReemplazar.id_Marca = tbl_w_Vehiculo.id_Marca;
            objReemplazar.modelo_vehiculo = tbl_w_Vehiculo.modelo_vehiculo;

            objReemplazar.color_Vehiculo = tbl_w_Vehiculo.color_Vehiculo;
            objReemplazar.nroMotor_Vehiculo = tbl_w_Vehiculo.nroMotor_Vehiculo;
            objReemplazar.nroChasis_Vehiculo = tbl_w_Vehiculo.nroChasis_Vehiculo;
            //objReemplazar.id_Categoria = tbl_w_Vehiculo.id_Categoria;

            objReemplazar.id_Carroceria = tbl_w_Vehiculo.id_Carroceria;
            objReemplazar.anio_Vehiculo = tbl_w_Vehiculo.anio_Vehiculo;
            objReemplazar.cilidraje_Vehiculo = tbl_w_Vehiculo.cilidraje_Vehiculo;
            objReemplazar.id_Combustible = tbl_w_Vehiculo.id_Combustible;

            objReemplazar.kmInicial_Vehiculo = tbl_w_Vehiculo.kmInicial_Vehiculo;
            objReemplazar.kmMant_Vehiculo = tbl_w_Vehiculo.kmMant_Vehiculo;
            objReemplazar.dni_Conductor = tbl_w_Vehiculo.dni_Conductor;
            //objReemplazar.ruc_Proveedor = tbl_w_Vehiculo.ruc_Proveedor;

            objReemplazar.id_Estado = tbl_w_Vehiculo.id_Estado;
            objReemplazar.usuario_edicion = tbl_w_Vehiculo.usuario_creacion;
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



        // DELETE: api/tbl_w_Vehiculo/5
        [ResponseType(typeof(tbl_w_Vehiculo))]
        public IHttpActionResult Deletetbl_w_Vehiculo(int id)
        {
            tbl_w_Vehiculo tbl_w_Vehiculo = db.tbl_w_Vehiculo.Find(id);
            if (tbl_w_Vehiculo == null)
            {
                return NotFound();
            }

            db.tbl_w_Vehiculo.Remove(tbl_w_Vehiculo);
            db.SaveChanges();

            return Ok(tbl_w_Vehiculo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_w_VehiculoExists(int id)
        {
            return db.tbl_w_Vehiculo.Count(e => e.id_Vehiculo == id) > 0;
        }
    }
}