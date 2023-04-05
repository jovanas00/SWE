namespace BackEnd.Models
{
    [Table("SALON")]
    public class Salon //: Korisnik
    {
        [Key()]
        [JsonIgnore]
        [Column("SalonID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(20)]
        [Required()]
        public string Naziv {get; set;}

        [Column("Adresa")]
        [MaxLength(20)]
        [Required()]
        public string Adresa { get; set; }

        [Column("Grad")]
        [MaxLength(20)]
        [Required()]
        public string Grad { get; set; }

        [Column("ProsecnaOcena")]
        //mozda neko ogranicenje da ne moze da bude veca od 5
        [Required()]
        public float ProsecnaOcena { get; set; }

        [Column("BrojTelefona")]
        //ogranicenje da nema vise od 13 cifre/karaktera za broj telefona
        [Required()] //da li je bolje da je string, a ne broj
        public long BrojTelefona { get; set; }

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual Korisnik Korisnik {get;set;} 
        [JsonIgnore]
        public virtual List<Usluga> Usluge {get;set;}  
        [JsonIgnore]
        public virtual List<Proizvod> Proizvodi {get;set;} 
        [JsonIgnore]
        public virtual List<Recenzija> Recenzije {get;set;} 
        [JsonIgnore]
        public virtual List<Pitanje> Pitanja {get;set;} 
        [JsonIgnore]
        public virtual List<Zahtev> Zahtevi {get;set;}
        [JsonIgnore]
        public virtual List<Narudzbina> Narudzbine {get;set;}  
        #endregion ReferenceNaDrugeKlase
   }
}