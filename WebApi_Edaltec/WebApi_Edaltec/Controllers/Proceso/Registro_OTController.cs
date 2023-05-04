using Datos;
using Negocio.Procesos;
using Negocio.Resultados;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi_Edaltec.Controllers.Proceso
{
    [EnableCors("*", "*", "*")]
    public class Registro_OTController : ApiController
    {

        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();

        public object GetOT(int opcion, string filtro)
        {
            Resultado res = new Resultado();
            RegistroOT_BL obj_negocio = new RegistroOT_BL();

            object resul = null;
            try
            {
                if (opcion == 1)
                {
                    string[] parametros = filtro.Split('|');

                    string idCliente = parametros[0].ToString();
                    string nroOT = parametros[1].ToString();
                    string tipoTrabajo = parametros[2].ToString();
                    string inspeccionado = parametros[3].ToString();
                    string fechaelectrica = parametros[4].ToString();
                    string fechaEjecucion = parametros[5].ToString();

                    resul = obj_negocio.get_registroOrdenes(idCliente, nroOT, tipoTrabajo, inspeccionado, fechaelectrica, fechaEjecucion);
                }
                else if (opcion == 2)
                {
                    res.ok = true;
                    res.data = obj_negocio.get_clientes();

                    resul = res;
                }
                else if (opcion == 3)
                {
                    res.ok = true;
                    res.data = obj_negocio.get_tipoTrabajos();

                    resul = res;
                }

                else if (opcion == 4)
                {
                    res.ok = true;
                    res.data = obj_negocio.get_inspeccionado();

                    resul = res;
                }
                else if (opcion == 5)
                {
                    res.ok = true;
                    res.data = obj_negocio.get_areas();

                    resul = res;
                }
                else if (opcion == 6)
                {
                    res.ok = true;
                    res.data = obj_negocio.get_distritos();

                    resul = res;
                }
                else if (opcion == 7)
                {
                    res.ok = true;
                    res.data = obj_negocio.get_supervisorEdaltec();

                    resul = res;
                }

                else if (opcion == 8)
                {
                    res.ok = true;
                    res.data = obj_negocio.get_tiposReparacion();

                    resul = res;
                }
                else if (opcion == 9)
                {
                    res.ok = true;
                    res.data = obj_negocio.get_estados();

                    resul = res;
                }
                else if (opcion == 10)
                {
                    string[] parametros = filtro.Split('|');
                    int idOT = Convert.ToInt32(parametros[0].ToString());

                    res.ok = true;
                    res.data = obj_negocio.get_editCargaInicial(idOT);

                    resul = res;
                }
                else if (opcion == 11)
                {
                    string[] parametros = filtro.Split('|');
                    int idOT = Convert.ToInt32(parametros[0].ToString());

                    res.ok = true;
                    res.data = obj_negocio.get_ocurrencias(idOT);

                    resul = res;
                }
                else if (opcion == 12)
                {
                    string[] parametros = filtro.Split('|');
                    int idOT = Convert.ToInt32(parametros[0].ToString());
                    int idOcurrencia = Convert.ToInt32(parametros[1].ToString());
                    string ocurrencia = parametros[2].ToString();
                    string idUsuario = parametros[3].ToString();

                    resul = obj_negocio.set_guardarOcurrencia(idOT, idOcurrencia, ocurrencia, idUsuario);
                }
                else if (opcion == 13)
                {
                    string[] parametros = filtro.Split('|');
                    int idOT = Convert.ToInt32(parametros[0].ToString());

                    res.ok = true;
                    res.data = obj_negocio.get_mostrarTiposReparacionMontos(idOT);

                    resul = res;
                }
                else if (opcion == 14)
                {
                    string[] parametros = filtro.Split('|');
                    int idOT = Convert.ToInt32(parametros[0].ToString());

                    res.ok = true;
                    res.data = obj_negocio.get_mostrarTiposReparacionMultipleOT(idOT);

                    resul = res;
                }
                else if (opcion == 15)
                {
                    string[] parametros = filtro.Split('|');
                    int idOT = Convert.ToInt32(parametros[0].ToString());
                    string tiposReparacionMultiple = parametros[1].ToString();

                    res.ok = true;
                    res.data = obj_negocio.save_update_tiposReparacionMultiple(idOT, tiposReparacionMultiple);

                    resul = res;
                }
                else if (opcion == 16)
                {
                    string[] parametros = filtro.Split('|');
                    int idOT = Convert.ToInt32(parametros[0].ToString());
                    resul = obj_negocio.GenerarReporte_ocurrencias(idOT);
                }
                else if (opcion == 17)
                {
                    string[] parametros = filtro.Split('|');
                    int idOT = Convert.ToInt32(parametros[0].ToString());

                    res.ok = true;
                    res.data = obj_negocio.get_archivosCargadosEvidencias(idOT);

                    resul = res;
                }
                else if (opcion == 18)
                {
                    string[] parametros = filtro.Split('|');
                    int id_OrdenTrabajo_Archivos = Convert.ToInt32(parametros[0].ToString());
                    string idUsuario = parametros[1].ToString();
 
                    resul = obj_negocio.set_anular_archivosCargadosEvidencias(id_OrdenTrabajo_Archivos, idUsuario);
                }
                else if (opcion == 19)
                {

                    string[] parametros = filtro.Split('|');
                    int idOt = Convert.ToInt32(parametros[0].ToString());
                    int id_OrdenTrabajo_Metrado = Convert.ToInt32(parametros[1].ToString());
                    int idTipoReparacion = Convert.ToInt32(parametros[2].ToString());

                    string largo = parametros[3].ToString();
                    string ancho = parametros[4].ToString();
                    string espesor = parametros[5].ToString();
                    string id_usuario = parametros[6].ToString();

                    resul = obj_negocio.set_guardarActualizarMetrados(idOt, id_OrdenTrabajo_Metrado, idTipoReparacion, largo, ancho, espesor, id_usuario);
                }
                else if (opcion == 20)
                {
                    string[] parametros = filtro.Split('|');
                    int idOT = Convert.ToInt32(parametros[0].ToString());

                    res.ok = true;
                    res.data = obj_negocio.get_metrados(idOT);

                    resul = res;
                }
                else if (opcion == 21)
                {
                    string[] parametros = filtro.Split('|');
                    int id_OrdenTrabajo_Metrado = Convert.ToInt32(parametros[0].ToString());
                    string idUsuario = parametros[1].ToString();

                    resul = obj_negocio.set_anularMetrados(id_OrdenTrabajo_Metrado, idUsuario);
                }
                else if (opcion == 22)
                {
                    string[] parametros = filtro.Split('|');
                    int idOT = Convert.ToInt32(parametros[0].ToString());

                    res.ok = true;
                    res.data = obj_negocio.get_fotosTab4(idOT);

                    resul = res;
                }
                else if (opcion == 23)
                {
                    string[] parametros = filtro.Split('|');
                    int id_OrdenTrabajo_Foto = Convert.ToInt32(parametros[0].ToString());
                    string idUsuario = parametros[1].ToString();

                    resul = obj_negocio.set_anularFotoTab4(id_OrdenTrabajo_Foto, idUsuario);
                }
                else if (opcion == 24)
                {
                    string[] parametros = filtro.Split('|');
                    int idOt = Convert.ToInt32(parametros[0].ToString());
                    string idUsuario = parametros[1].ToString();

                    res.ok = true;
                    res.data = obj_negocio.get_descargar_Todos_fotosOT(idOt,idUsuario);
                    resul = res;
                }
                else if (opcion == 25)
                {
                    string[] parametros = filtro.Split('|');
                    int idOT = Convert.ToInt32(parametros[0].ToString());

                    resul = obj_negocio.get_reportePDF_ot(idOT);
                }
                else if (opcion == 26)
                {
                    string[] parametros = filtro.Split('|');
                    int idOT = Convert.ToInt32(parametros[0].ToString());

                    resul = obj_negocio.get_reporteReporte_ot(idOT);
                }
                else if (opcion == 27)
                {
                    string[] parametros = filtro.Split('|');

                    string idCliente = parametros[0].ToString();
                    string nroOT = parametros[1].ToString();
                    string tipoTrabajo = parametros[2].ToString();
                    string inspeccionado = parametros[3].ToString();
                    string fechaelectrica = parametros[4].ToString();
                    string fechaEjecucion = parametros[5].ToString();

                    resul = obj_negocio.GenerarReporte_registrosOT(idCliente, nroOT, tipoTrabajo, inspeccionado, fechaelectrica, fechaEjecucion);

                }

                else if (opcion == 100)
                {

                    string[] parametros = filtro.Split('|');
                    int id_OT = Convert.ToInt32(parametros[0].ToString());
                    int id_tipoTrabajo = Convert.ToInt32(parametros[1].ToString());
                    string idUsuario = parametros[2].ToString();


                    if (id_tipoTrabajo == 822) //---MTTO CALIENTE
                    {
                        resul = obj_negocio.GenerarReporte_mttoCaliente(id_OT, idUsuario);
                    }
                    if (id_tipoTrabajo == 823) //--- TERMOVISION
                    {
                        resul = obj_negocio.GenerarReporte_termovision(id_OT, idUsuario);
                    }
                    if (id_tipoTrabajo == 824)//--- INSPECCIONES MT
                    {
                        resul = obj_negocio.GenerarReporte_inspecciones(id_OT, idUsuario);
                    }
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
        [Route("api/Registro_OT/tbl_w_OrdenTrabajo_CAB")]
        public object tbl_w_OrdenTrabajo_CAB(tbl_w_OrdenTrabajo_CAB tbl_w_OrdenTrabajo_CAB )    
        {
            Resultado res = new Resultado();
            try
            {
                tbl_w_OrdenTrabajo_CAB.fecha_creacion = DateTime.Now;
                db.tbl_w_OrdenTrabajo_CAB.Add(tbl_w_OrdenTrabajo_CAB );
                db.SaveChanges();

                res.ok = true;
                res.data = tbl_w_OrdenTrabajo_CAB.id_OrdenTrabajo; 
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message; 
            }
            return res;
        }

        [HttpPut]
        [Route("api/Registro_OT/Puttbl_w_OrdenTrabajo_CAB")]
        public object Puttbl_w_OrdenTrabajo_CAB(int id, tbl_w_OrdenTrabajo_CAB  tbl_w_OrdenTrabajo_CAB )
        {
            Resultado res = new Resultado();

            tbl_w_OrdenTrabajo_CAB  objReemplazar;
            objReemplazar = db.tbl_w_OrdenTrabajo_CAB .Where(v => v.id_OrdenTrabajo == id).FirstOrDefault<tbl_w_OrdenTrabajo_CAB >();
            
            objReemplazar.id_Servicio = tbl_w_OrdenTrabajo_CAB.id_Servicio;
            objReemplazar.fechaCorreo_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.fechaCorreo_OrdenTrabajo;
            objReemplazar.extension = tbl_w_OrdenTrabajo_CAB.extension;
            objReemplazar.fechaElectrica_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.fechaElectrica_OrdenTrabajo;

            objReemplazar.fechaAsignada_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.fechaAsignada_OrdenTrabajo;
            objReemplazar.id_TipoTrabajo = tbl_w_OrdenTrabajo_CAB.id_TipoTrabajo;
            objReemplazar.numero_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.numero_OrdenTrabajo;
            objReemplazar.nroCliente_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.nroCliente_OrdenTrabajo;
            objReemplazar.id_Distrito = tbl_w_OrdenTrabajo_CAB.id_Distrito;

            objReemplazar.direccion_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.direccion_OrdenTrabajo;
            objReemplazar.nroSED = tbl_w_OrdenTrabajo_CAB.nroSED;
            objReemplazar.cliente_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.cliente_OrdenTrabajo;
            objReemplazar.cxr_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.cxr_OrdenTrabajo;
            objReemplazar.fechaProgramada_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.fechaProgramada_OrdenTrabajo;
            objReemplazar.id_Supervisor = tbl_w_OrdenTrabajo_CAB.id_Supervisor;

            objReemplazar.id_Supervisor2 = tbl_w_OrdenTrabajo_CAB.id_Supervisor2;
            objReemplazar.fechaAsigndaCampo_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.fechaAsigndaCampo_OrdenTrabajo;
            objReemplazar.supervisorContratista = tbl_w_OrdenTrabajo_CAB.supervisorContratista;
            objReemplazar.cantDesm = tbl_w_OrdenTrabajo_CAB.cantDesm;
            objReemplazar.fechaElimDes_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.fechaElimDes_OrdenTrabajo;
            objReemplazar.fechaEjecutado_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.fechaEjecutado_OrdenTrabajo;

            objReemplazar.personal_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.personal_OrdenTrabajo;
            objReemplazar.cemento_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.cemento_OrdenTrabajo;
            objReemplazar.logistica_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.logistica_OrdenTrabajo;
            objReemplazar.tiempoGrabEfect_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.tiempoGrabEfect_OrdenTrabajo;
            objReemplazar.tiempoGrabDesest_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.tiempoGrabDesest_OrdenTrabajo;
            objReemplazar.unidad_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.unidad_OrdenTrabajo;

            objReemplazar.gastoGenerales_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.gastoGenerales_OrdenTrabajo;
            objReemplazar.salida_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.salida_OrdenTrabajo;
            objReemplazar.llegada_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.llegada_OrdenTrabajo;
            objReemplazar.km_OrdenTrabajo = tbl_w_OrdenTrabajo_CAB.km_OrdenTrabajo;
            objReemplazar.id_Estado = tbl_w_OrdenTrabajo_CAB.id_Estado;


            objReemplazar.usuario_edicion = tbl_w_OrdenTrabajo_CAB.usuario_creacion;
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

    }
}
