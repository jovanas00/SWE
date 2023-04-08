namespace BackEnd.Models
{
    [Table("KLIJENT")]
    public class Klijent 
    {
        [Key()]
        [JsonIgnore]
        [Column("KlijentID")]
        public int ID { get; set; }

        [Column("Ime")]
        [MaxLength(20)]
        [Required()]
        public string ime {get; set;}

        [Column("Prezime")]
        [MaxLength(20)]
        [Required()]
        public string prezime {get; set;}

        [Column("Adresa")]
        [MaxLength(20)]
        [Required()]
        public string adresa { get; set; }

        [Column("Grad")]
        [MaxLength(20)]
        [Required()]
        public string grad { get; set; }

        [Column("BrojTelefona")]
        [MaxLength(13)]
        [Required()]
        public string brojTelefona { get; set; }

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual Korpa Korpa {get;set;}  
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