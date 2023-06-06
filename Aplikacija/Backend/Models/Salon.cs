namespace BackEnd.Models
{
    [Table("SALON")]
    public class Salon
    {
        [Key()]
        [JsonIgnore]
        [Column("SalonID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(30)]
        [Required()]
        public string naziv {get; set;}

        [Column("Adresa")]
        [MaxLength(40)]
        [Required()]
        public string adresa { get; set; }

        [Column("Grad")]
        [MaxLength(30)]
        [Required()]
        public string grad { get; set; }

        [Column("BrojTelefona")]
        [MaxLength(13)]
        [Required()] 
        public string brojTelefona { get; set; }

        #region ReferenceNaDrugeKlase
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
        public virtual Korisnik Korisnik { get; set; }
        #endregion ReferenceNaDrugeKlase
   }
}