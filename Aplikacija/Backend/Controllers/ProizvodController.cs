using System.Net.Http.Headers;

namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
public class ProizvodController : ControllerBase
{
    public PPContext Context { get; set; }
    public ProizvodController(PPContext context)
    {
        Context = context;
    }

    //metoda za testiranje povezivanja sa frontom
    // [Route("VratiSveProizvode")]
    // [HttpGet]
    // public async Task<ActionResult<IEnumerable<Proizvod>>> VratiSveProizvode()
    // {
    //     return await Context.Proizvodi.ToListAsync();
    // }

    [Route("DodajProizvod/{naziv}/{cena}/{dostupnost}/{slika}/{id_kategorija}/{id_salon}")] 
    [HttpPost]
    public async Task<ActionResult<Proizvod>> DodajProizvod(string naziv, float cena,int id_kategorija, int id_salon)
    {
        Kategorija k = await Context.Kategorije.FindAsync(id_kategorija);
        if(k==null)
            return BadRequest("Trazena kategorija ne postoji.");
        Salon s = await Context.Saloni.FindAsync(id_salon);
        if(s==null)
            return BadRequest("Trazeni salon ne postoji.");
        try
            {  
                
                Proizvod p = new Proizvod{
                    naziv=naziv,
                    cena=cena,
                    dostupnost=true,
                    Kategorija = k,
                    Salon = s//??
                };
                Context.Proizvodi.Add(p);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodat proizvod.");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
    }

    [Route("ObrisiProizvod/{id_proizvod}")]
    [HttpDelete]
    public async Task<ActionResult<Proizvod>> ObrisiProizvod(int id_proizvod)
    {
        try
            {  
                Proizvod p = await Context.Proizvodi.FindAsync(id_proizvod);
                if(p==null)
                    return NotFound();
                Context.Proizvodi.Remove(p);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisan proizvod.");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
    }

    [Route("IzmeniProizvod/{id_proizvod}")]
    [HttpPut]
    public async Task<ActionResult<Proizvod>> IzmeniProizvod(int id_proizvod,string naziv,float cena,string kategorija)
    {
        var p = await Context.Proizvodi.FindAsync(id_proizvod);
        var k = Context.Kategorije.Where(k=>k.naziv==kategorija).FirstOrDefault();
        if(p == null)
            return NotFound();
        try{

            p.naziv = naziv;
            p.cena = cena;
            p.Kategorija = k;
            await Context.SaveChangesAsync();

            return Ok(p);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }    
    } 

    [Route("IzmeniDostupnost/{id_proizvod}")]
    [HttpPut]
     public async Task<ActionResult<Proizvod>> IzmeniProizvod(int id_proizvod)
    {
        try
        {
         var p = await Context.Proizvodi.FindAsync(id_proizvod);
         if(p == null)
            return NotFound();
            if(p.dostupnost==true)
                p.dostupnost = false;
            else
                p.dostupnost = true;
            await Context.SaveChangesAsync();
            return Ok(p);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }    
    }

    [Route("UploadProizvodSlika/{id_proizvod}")]
    [HttpPost]
    public async Task<ActionResult> UploadProizvodSlika(int id_proizvod)
    {
        //frontend za testiranje
         try
            {
                Proizvod retVal = Context.Proizvodi.Where(p=>p.ID==id_proizvod).FirstOrDefault();
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources","Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(),folderName);

                if(file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave,fileName);
                    var dbPath = Path.Combine(folderName,fileName);
                    using(var stream = new FileStream(fullPath,FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    retVal.slika=dbPath;
                    await Context.SaveChangesAsync();
                    return Ok(new {dbPath});
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception e)
            {
                return StatusCode(500, $"Internal server error: {e}");
            }
    }
}