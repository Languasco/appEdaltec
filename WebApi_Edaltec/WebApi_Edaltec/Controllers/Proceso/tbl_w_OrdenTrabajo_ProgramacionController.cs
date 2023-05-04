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
using Negocio.Procesos;
using Negocio.Resultados;

namespace WebApi_Edaltec.Controllers.Proceso
{
    [EnableCors("*", "*", "*")]
    public class tbl_w_OrdenTrabajo_ProgramacionController : ApiController
    {
        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();

        // GET: api/tbl_w_OrdenTrabajo_Programacion
        public IQueryable<tbl_w_OrdenTrabajo_Programacion> Gettbl_w_OrdenTrabajo_Programacion()
        {
            return db.tbl_w_OrdenTrabajo_Programacion;
        }


        public object GetProgramacionOT(int opcion, string filtro)
        {
            Resultado res = new Resultado();
            object resul = null;
            try
            {
                if (opcion == 1)
                {
                    string[] parametros = filtro.Split('|');
                    string idCliente = parametros[0].ToString();
                    string fechaInicial = parametros[1].ToString();
                    string fechaFinal = parametros[2].ToString();
                    int TipoProceso = Convert.ToInt32(parametros[3].ToString());

                    ProgramacionOT_BL obj_negocio = new ProgramacionOT_BL();    
                    resul = obj_negocio.get_programacionOT_cab(idCliente, fechaInicial, fechaFinal, TipoProceso);         
                }
                else if (opcion == 2)
                {
                    string[] parametros = filtro.Split('|');
                    int id_Vehiculo = Convert.ToInt32(parametros[0].ToString());
                    string idUsuario = parametros[1].ToString();

                    ProgramacionOT_BL obj_negocio = new ProgramacionOT_BL();

                    resul = obj_negocio.set_anularProgramacionOT(id_Vehiculo, idUsuario);
                }
                else if (opcion == 3)
                {
                    string[] parametros = filtro.Split('|');
                    string nroPlaca = parametros[0].ToString();

                    ProgramacionOT_BL obj_negocio = new ProgramacionOT_BL();
                    res.ok = true;
                    res.data = obj_negocio.get_buscarVehiculo_placa(nroPlaca);
                    resul = res;
                }
                else if (opcion == 4)
                {
                    string[] parametros = filtro.Split('|');
                    int id_Cliente = Convert.ToInt32(parametros[0].ToString());
                    string fechaProgramacion = parametros[1].ToString();
                    string ges_Empl_DNI_JefeCuadrilla = parametros[2].ToString();

                    ProgramacionOT_BL obj_negocio = new ProgramacionOT_BL();
                    res.ok = true;
                    res.data = obj_negocio.get_validarProgramacionOT(id_Cliente, fechaProgramacion, ges_Empl_DNI_JefeCuadrilla);
                    resul = res;               
                }
                else if (opcion == 5)
                {
                    string[] parametros = filtro.Split('|');
                    int id_Cliente = Convert.ToInt32(parametros[0].ToString());

                    ProgramacionOT_BL obj_negocio = new ProgramacionOT_BL();
                    res.ok = true;
                    res.data = obj_negocio.get_ProgramacionOT_cliente(id_Cliente);
                    resul = res;
                }
                else if (opcion == 6)
                {
                    string[] parametros = filtro.Split('|');
                    int id_Cliente = Convert.ToInt32(parametros[0].ToString());
                    string fechaProgramacion = parametros[1].ToString();
                    string coordinador = parametros[2].ToString();
                    int id_vehiculo = Convert.ToInt32(parametros[3].ToString());
                    string idProgramacionMasivo = parametros[4].ToString();
                    string idusuario = parametros[5].ToString();

                    ProgramacionOT_BL obj_negocio = new ProgramacionOT_BL(); 
                    resul = obj_negocio.set_ActualizarProgramacionCab(id_Cliente, fechaProgramacion, coordinador, id_vehiculo, idProgramacionMasivo, idusuario); 
                }
                else if (opcion == 7)
                {
                    string[] parametros = filtro.Split('|');
                    int id_OrdenTrabajo = Convert.ToInt32(parametros[0].ToString());

                    ProgramacionOT_BL obj_negocio = new ProgramacionOT_BL();
                    res.ok = true;
                    res.data = obj_negocio.get_programacionTrabajoEdicion(id_OrdenTrabajo);
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
        [Route("api/tbl_w_OrdenTrabajo_Programacion/PostProgramacionOT")]
        public object PostProgramacionOT(tbl_w_OrdenTrabajo_Programacion tbl_w_OrdenTrabajo_Programacion)
        {
            Resultado res = new Resultado();
            try
            {
                tbl_w_OrdenTrabajo_Programacion.fecha_creacion = DateTime.Now;
                db.tbl_w_OrdenTrabajo_Programacion.Add(tbl_w_OrdenTrabajo_Programacion);
                db.SaveChanges();

                res.ok = true;
                res.data = tbl_w_OrdenTrabajo_Programacion.id_Vehiculo;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        [HttpPut]
        [Route("api/tbl_w_OrdenTrabajo_Programacion/PutProgramacionOT")]
        public object PutProgramacionOT(int id, tbl_w_OrdenTrabajo_Programacion tbl_w_OrdenTrabajo_Programacion)
        {
            Resultado res = new Resultado();

            tbl_w_OrdenTrabajo_Programacion objReemplazar;
            objReemplazar = db.tbl_w_OrdenTrabajo_Programacion.Where(v => v.id_OrdenProgramacion == id).FirstOrDefault<tbl_w_OrdenTrabajo_Programacion>();
             
            objReemplazar.id_Cliente = tbl_w_OrdenTrabajo_Programacion.id_Cliente;
            objReemplazar.fechaProgramacion = tbl_w_OrdenTrabajo_Programacion.fechaProgramacion;
            objReemplazar.ges_Empl_DNI_JefeCuadrilla = tbl_w_OrdenTrabajo_Programacion.ges_Empl_DNI_JefeCuadrilla;

            objReemplazar.id_Vehiculo = tbl_w_OrdenTrabajo_Programacion.id_Vehiculo;
            objReemplazar.id_TipoTrabajo = tbl_w_OrdenTrabajo_Programacion.id_TipoTrabajo;
            objReemplazar.numero_Orden_Programa = tbl_w_OrdenTrabajo_Programacion.numero_Orden_Programa;
            objReemplazar.id_Distrito_Programa = tbl_w_OrdenTrabajo_Programacion.id_Distrito_Programa;
            objReemplazar.direccion_Programa = tbl_w_OrdenTrabajo_Programacion.direccion_Programa;

            objReemplazar.id_Estado = tbl_w_OrdenTrabajo_Programacion.id_Estado;
            objReemplazar.usuario_edicion = tbl_w_OrdenTrabajo_Programacion.usuario_creacion;
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




        // DELETE: api/tbl_w_OrdenTrabajo_Programacion/5
        [ResponseType(typeof(tbl_w_OrdenTrabajo_Programacion))]
        public IHttpActionResult Deletetbl_w_OrdenTrabajo_Programacion(int id)
        {
            tbl_w_OrdenTrabajo_Programacion tbl_w_OrdenTrabajo_Programacion = db.tbl_w_OrdenTrabajo_Programacion.Find(id);
            if (tbl_w_OrdenTrabajo_Programacion == null)
            {
                return NotFound();
            }

            db.tbl_w_OrdenTrabajo_Programacion.Remove(tbl_w_OrdenTrabajo_Programacion);
            db.SaveChanges();

            return Ok(tbl_w_OrdenTrabajo_Programacion);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_w_OrdenTrabajo_ProgramacionExists(int id)
        {
            return db.tbl_w_OrdenTrabajo_Programacion.Count(e => e.id_OrdenProgramacion == id) > 0;
        }
    }
}