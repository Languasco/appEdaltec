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

namespace WebApi_Edaltec.Controllers.Mantenimiento
{
    [EnableCors("*", "*", "*")]
    public class tbl_w_ContratoController : ApiController
    {
        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();

        // GET: api/tbl_w_Contrato
        public IQueryable<tbl_w_Contrato> Gettbl_w_Contrato()
        {
            return db.tbl_w_Contrato;
        }

        // GET: api/tbl_w_Contrato/5
        [ResponseType(typeof(tbl_w_Contrato))]
        public IHttpActionResult Gettbl_w_Contrato(int id)
        {
            tbl_w_Contrato tbl_w_Contrato = db.tbl_w_Contrato.Find(id);
            if (tbl_w_Contrato == null)
            {
                return NotFound();
            }

            return Ok(tbl_w_Contrato);
        }

        // PUT: api/tbl_w_Contrato/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttbl_w_Contrato(int id, tbl_w_Contrato tbl_w_Contrato)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbl_w_Contrato.id_Contrato)
            {
                return BadRequest();
            }

            db.Entry(tbl_w_Contrato).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tbl_w_ContratoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/tbl_w_Contrato
        [ResponseType(typeof(tbl_w_Contrato))]
        public IHttpActionResult Posttbl_w_Contrato(tbl_w_Contrato tbl_w_Contrato)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tbl_w_Contrato.Add(tbl_w_Contrato);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tbl_w_Contrato.id_Contrato }, tbl_w_Contrato);
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