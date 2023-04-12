namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
public class ProizvodUslugaController : ControllerBase
{
    public PPContext Context { get; set; }
    public ProizvodUslugaController(PPContext context)
    {
        Context = context;
    }

    //Proizvodi

    //vrati sve proizvode
    [Route("VratiSveProizvode")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Proizvod>>> VratiSveProizvode()
    {
        return await Context.Proizvodi.ToListAsync();
    }

    //vrati jedan proizvod
    [Route("VratiProizvod/{id_proizvod}")]
    [HttpGet]
    public async Task<ActionResult<Proizvod>> VratiProizvod(int id_proizvod)
    {
        var p = await Context.Proizvodi.FindAsync(id_proizvod);
        if(p==null)
            return NotFound();
        return p;
    }

    //dodaj proizvod - dal ovo da ide from body mnogo mi dugacko
    [Route("DodajProizvod/{naziv}/{cena}/{dostupnost}/{slika}/{id_kategorija}/{id_salon}")] //naziv, cena, dostupnost, slika: string, float, bool, string
    [HttpPost]
    public async Task<ActionResult<Proizvod>> DodajProizvod(string naziv, float cena, bool dostupnost, string slika, int id_kategorija, int id_salon)
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
                    dostupnost=dostupnost,
                    slika=slika,
                    Kategorija = k,
                    Salon = s
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

    //obrisi proizvod
    [Route("ObrisiProizvod/{id_proizvod}")]
    [HttpPost]
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

    //izmeni proizvod
    [Route("IzmeniProizvod/{id_proizvod}")]
    [HttpPut]
    public async Task<ActionResult<Proizvod>> IzmeniProizvod(int id_proizvod, Proizvod noviProizvod)
    {
        var p = await Context.Proizvodi.FindAsync(id_proizvod);
        if(p == null)
            return NotFound();
        try{

            p.naziv = noviProizvod.naziv;
            p.cena = noviProizvod.cena;
            p.dostupnost = noviProizvod.dostupnost;
            p.slika = noviProizvod.slika;
            p.Kategorija = noviProizvod.Kategorija;
            p.Salon = noviProizvod.Salon;
            await Context.SaveChangesAsync();

            return Ok(p);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }    
    } 

    //Usluge

    //vrati sve usluge
    [Route("VratiSveUsluge")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Usluga>>> VratiSveUsluge()
    {
        return await Context.Usluge.ToListAsync();
    }

    //vrati jednu uslugu
    [Route("VratiUslugu/{id_usluga}")]
    [HttpGet]
    public async Task<ActionResult<Usluga>> VratiUslugu(int id_usluga)
    {
        Usluga u = await Context.Usluge.FindAsync(id_usluga);
        if(u==null)
            return NotFound();
        return u;
    }

    //DodajUslugu
    [Route("DodajUslugu/{naziv}/{cena}/{opis}/{kapacitet}/{dostupnost}/{id_salon}")]
    [HttpPost]
    public async Task<ActionResult<Usluga>> DodajUslugu(string naziv, float cena, string opis, int kapacitet, bool dostupnost, int id_salon)
    {
        Salon s = await Context.Saloni.FindAsync(id_salon);
        if(s==null)
                return NotFound();
        try
            {  
                
                Usluga u = new Usluga{
                    Naziv=naziv,
                    cena=cena,
                    opis=opis,
                    //Kapacitet = kapacitet,
                    dostupnost=dostupnost,
                    Salon=s
                };
                Context.Usluge.Add(u);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodata usluga.");
            }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //obrisi uslugu
    [Route("ObrisiUslugu/{id_usluga}")]
    [HttpPost]
    public async Task<ActionResult<Usluga>> ObrisiUslugu(int id_usluga)
    {
        Usluga u = await Context.Usluge.FindAsync(id_usluga);
        if(u==null)
            return NotFound();
        try
            {  
                Context.Usluge.Remove(u);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana usluga.");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
    }
    //string:naziv, float:cena, string:opis, int:kapacitet 
    //bool:dostupnost, Salon:salon, List<Zahtev>zahtevi

    //izmeni uslugu
    [Route("IzmeniUslugu/{id_usluga}")]
    [HttpPut]
    public async Task<ActionResult<Usluga>> IzmeniUslugu(int id_usluga, Usluga novaUsluga)
    {
        Usluga u = await Context.Usluge.FindAsync(id_usluga);
        if(u == null)
            return NotFound();
        try{    
            u.Naziv = novaUsluga.Naziv;
            u.cena = novaUsluga.cena;
            u.opis = novaUsluga.opis;
            //u.Kapacitet = novaUsluga.Kapacitet;
            u.dostupnost = novaUsluga.dostupnost;
            u.Salon = novaUsluga.Salon;
            await Context.SaveChangesAsync();
            return Ok(u);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }    
    } 
}