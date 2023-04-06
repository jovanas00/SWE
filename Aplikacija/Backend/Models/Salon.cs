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
<<<<<<< HEAD
=======
        //mozda neko ogranicenje da ne moze da bude veca od 5---Ogranicenje kod ocene kad klijent oceni je dovoljno
>>>>>>> f075a7cd4bccdbf3ad6ef553ef86b7d22a4ea904
        [Required()]
        public float ProsecnaOcena { get; set; }

        [Column("BrojTelefona")]
<<<<<<< HEAD
        [MaxLength(13)]
        [Required()] 
        public string BrojTelefona { get; set; }
=======
        //ogranicenje da nema vise od 13 cifre/karaktera za broj telefona---NE
        [Required()] //da li je bolje da je string, a ne broj---STRING
        public long BrojTelefona { get; set; }
>>>>>>> f075a7cd4bccdbf3ad6ef553ef86b7d22a4ea904

        #region ReferenceNaDrugeKlase
        //[JsonIgnore]
        //public virtual Korisnik Korisnik {get;set;} 
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